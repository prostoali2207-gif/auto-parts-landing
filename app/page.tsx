"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/create-landing-request";
const ANALYTICS_ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/track-landing-event";
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const WHATSAPP_URL = "https://wa.me/971544550149";
const TELEGRAM_URL = "https://t.me/dasmotors_dxb";

type SubmitState = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"vehicle" | "year" | "part" | "photo" | "contact", string>>;
type FunnelEvent = "landing_view" | "request_start" | "request_submit" | "request_error";
type FormStep = 1 | 2 | 3;
type StepDirection = "forward" | "back";
type PartEntry = { id: number; photoName: string };

function attribution() {
  const p = new URLSearchParams(window.location.search);
  let r = "";
  try { r = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
  return {
    source: p.get("utm_source") || undefined,
    medium: p.get("utm_medium") || undefined,
    campaign: p.get("utm_campaign") || undefined,
    referrerHost: r || undefined,
  };
}

export default function Home() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestNumber, setRequestNumber] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<FormStep>(1);
  const [stepDirection, setStepDirection] = useState<StepDirection>("forward");
  const [parts, setParts] = useState<PartEntry[]>([{ id: 0, photoName: "" }]);
  const [partErrorId, setPartErrorId] = useState<number | null>(null);
  const sessionId = useRef("");
  const started = useRef(false);
  const nextPartId = useRef(1);
  const trustVideo = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function track(eventName: FunnelEvent) {
    if (!sessionId.current) return;
    void fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ eventName, sessionId: sessionId.current, ...attribution() }),
    }).catch(() => undefined);
  }

  useEffect(() => {
    sessionId.current = crypto.randomUUID();
    track("landing_view");
  }, []);

  useEffect(() => {
    const video = trustVideo.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (reducedMotion.matches) {
        video.pause();
        if (video.readyState > 0) video.currentTime = 0;
        return;
      }
      void video.play().catch(() => undefined);
    };
    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);
    return () => reducedMotion.removeEventListener("change", syncPlayback);
  }, []);

  function markRequestStart() {
    if (started.current) return;
    started.current = true;
    track("request_start");
  }

  function focusField(form: HTMLFormElement, name: string) {
    const f = form.elements.namedItem(name);
    if (f instanceof HTMLElement) {
      f.focus();
      f.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function formText(v: FormData, name: string) {
    return String(v.get(name) ?? "").trim();
  }

  function collectParts(v: FormData) {
    return parts.map((entry, index) => {
      const prefix = `part-${entry.id}`;
      const partName = formText(v, `${prefix}-name`);
      const partNumber = formText(v, `${prefix}-number`);
      const description = formText(v, `${prefix}-description`);
      const photo = v.get(`${prefix}-photo`);
      const hasPhoto = photo instanceof File && photo.size > 0;
      const photoKeys = hasPhoto ? [`part-${index}-photo-0`] : [];
      return { entry, partName, partNumber, description, photo, hasPhoto, photoKeys };
    });
  }

  function failField(
    form: HTMLFormElement,
    errors: FieldErrors,
    name: string,
    step: FormStep,
    failedPartId: number | null = null,
  ) {
    setFieldErrors(errors);
    setPartErrorId(failedPartId);
    setState("error");
    setMessage("");
    setStepDirection(step < activeStep ? "back" : "forward");
    setActiveStep(step);
    requestAnimationFrame(() => requestAnimationFrame(() => focusField(form, name)));
  }

  function validateVehicle(form: HTMLFormElement, v: FormData) {
    const vin = formText(v, "vin");
    const carMake = formText(v, "carMake");
    const carModel = formText(v, "carModel");
    const carYear = formText(v, "carYear");

    if (!vin && !(carMake && carModel && carYear)) {
      failField(form, { vehicle: "Укажите VIN или марку, модель и год автомобиля." }, "vin", 1);
      return false;
    }
    if (carYear) {
      const y = Number(carYear);
      if (!Number.isInteger(y) || y < 1950 || y > 2100) {
        failField(form, { year: "Проверьте год автомобиля." }, "carYear", 1);
        return false;
      }
    }
    return true;
  }

  function validateParts(form: HTMLFormElement, v: FormData) {
    for (const part of collectParts(v)) {
      const name = `part-${part.entry.id}-name`;
      const photoName = `part-${part.entry.id}-photo`;

      if (!part.partName && !part.partNumber && !part.description && !part.hasPhoto) {
        failField(
          form,
          { part: "Добавьте название, OEM/Part Number, описание или фото детали — либо удалите пустую деталь." },
          name,
          2,
          part.entry.id,
        );
        return false;
      }

      if (part.hasPhoto && part.photo instanceof File) {
        if (!part.photo.type.startsWith("image/")) {
          failField(form, { photo: "Можно загружать только изображения." }, photoName, 2, part.entry.id);
          return false;
        }
        if (part.photo.size > MAX_PHOTO_BYTES) {
          failField(form, { photo: "Фотография слишком большая. Максимум 8 МБ." }, photoName, 2, part.entry.id);
          return false;
        }
      }
    }
    return true;
  }

  function focusStep(step: FormStep) {
    const form = formRef.current;
    if (!form) return;
    const target = step === 1 ? "vin" : step === 2 ? `part-${parts[0].id}-name` : "contact";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const field = form.elements.namedItem(target);
      if (field instanceof HTMLElement) field.focus({ preventScroll: true });
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      form.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }));
  }

  function moveToStep(step: FormStep, direction: StepDirection) {
    setStepDirection(direction);
    setActiveStep(step);
    focusStep(step);
  }

  function goNext() {
    const form = formRef.current;
    if (!form || activeStep === 3) return;
    const v = new FormData(form);
    setFieldErrors({});
    setPartErrorId(null);
    setMessage("");
    if (state === "error") setState("idle");

    if (activeStep === 1 && !validateVehicle(form, v)) return;
    if (activeStep === 2 && !validateParts(form, v)) return;

    moveToStep((activeStep + 1) as FormStep, "forward");
  }

  function goBack() {
    if (activeStep === 1) return;
    setFieldErrors({});
    setPartErrorId(null);
    setMessage("");
    if (state === "error") setState("idle");
    moveToStep((activeStep - 1) as FormStep, "back");
  }

  function addPart() {
    const id = nextPartId.current++;
    setParts((current) => [...current, { id, photoName: "" }]);
    setFieldErrors({});
    setPartErrorId(null);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const form = formRef.current;
      if (form) focusField(form, `part-${id}-name`);
    }));
  }

  function removePart(id: number) {
    if (parts.length === 1) return;
    setParts((current) => current.filter((part) => part.id !== id));
    if (partErrorId === id) {
      setFieldErrors({});
      setPartErrorId(null);
    }
  }

  function setPartPhotoName(id: number, photoName: string) {
    setParts((current) => current.map((part) => part.id === id ? { ...part, photoName } : part));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const v = new FormData(form);
    setFieldErrors({});
    setPartErrorId(null);
    setMessage("");

    if (!validateVehicle(form, v)) return;
    if (!validateParts(form, v)) return;

    const contact = formText(v, "contact");
    if (!contact) {
      failField(form, { contact: "Укажите телефон, WhatsApp или Telegram." }, "contact", 3);
      return;
    }

    const collectedParts = collectParts(v);
    const body = new FormData();
    for (const key of ["contact", "clientName", "vin", "carMake", "carModel", "carYear", "website"]) {
      const value = v.get(key);
      if (typeof value === "string") body.set(key, value);
    }
    body.set("analyticsSession", sessionId.current);
    body.set("parts", JSON.stringify(collectedParts.map(({ partName, partNumber, description, photoKeys }) => ({
      partName,
      partNumber,
      description,
      photoKeys,
    }))));
    for (const part of collectedParts) {
      if (part.photoKeys.length && part.photo instanceof File) body.set(part.photoKeys[0], part.photo);
    }

    setState("loading");
    track("request_submit");

    try {
      const response = await fetch(ENDPOINT, { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось отправить заявку");
      setRequestNumber(data.requestNumber ?? null);
      setState("success");
      setActiveStep(1);
      setStepDirection("forward");
      setParts([{ id: 0, photoName: "" }]);
      setPartErrorId(null);
      nextPartId.current = 1;
      form.reset();
    } catch (error) {
      track("request_error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
      setState("error");
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Das Motors">
          <span className="brandText">DasMotors</span>
        </a>
        <a className="topCta" href="#request">Запросить</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <h1>Нужна <span className="routeWord">запчасть?</span> Покажите машину и деталь.</h1>
          <p className="lead">Из ОАЭ в Россию и страны СНГ. VIN или марка, модель и год — плюс фото, название, OEM‑номер или описание детали. Добавьте контакт — менеджер продолжит подбор.</p>
          <div className="heroActions">
            <a className="primary" href="#request">Запросить запчасть</a>
            <span className="micro">Можно начать без точного названия детали.</span>
            <details className="managerContactDisclosure">
              <summary className="managerContactSummary">
                Есть вопрос? <span>Связаться с менеджером</span><i aria-hidden="true">→</i>
              </summary>
              <div className="managerContactChoices" aria-label="Связаться с менеджером">
                <a className="managerContactLink" href={WHATSAPP_URL}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
                    <path d="M9.2 8.5c.4 2.3 2 3.9 4.3 4.3" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a className="managerContactLink" href={TELEGRAM_URL}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m21 4-7.8 16-3.1-6.2L4 10.7 21 4Z" />
                    <path d="m10.1 13.8 4.4-4.4" />
                  </svg>
                  <span>Telegram</span>
                </a>
              </div>
            </details>
          </div>
        </div>

        <div className="heroObject" aria-hidden="true">
          <div className="objectHalo" />
          <div className="explodedObject">
            <span className="part partBackplate" />
            <span className="part partBracket" />
            <span className="part partHousing" />
            <span className="part partCore" />
            <span className="part partRing" />
            <span className="part partLens" />
            <span className="part partConnector" />
            <i className="part fastener fastenerA" />
            <i className="part fastener fastenerB" />
            <i className="part fastener fastenerC" />
          </div>
          <span className="objectGuide guideOne" />
          <span className="objectGuide guideTwo" />
        </div>
      </section>

      <section className="process" aria-labelledby="process-title">
        <div className="sectionHead compactProcessHead">
          <p className="eyebrow">Как это работает</p>
          <h2 id="process-title">Три шага — одна заявка.</h2>
        </div>
        <div className="processSequence">
          <article className="processStep stepVehicle">
            <span className="stepNo">01</span>
            <div><span className="stepCode">VEHICLE</span><h3>Автомобиль</h3><p>VIN или марка · модель · год</p></div>
          </article>
          <article className="processStep stepPart">
            <span className="stepNo">02</span>
            <div><span className="stepCode">PART</span><h3>Деталь</h3><p>Фото, название, OEM / Part Number или описание</p></div>
          </article>
          <article className="processStep stepContact">
            <span className="stepNo">03</span>
            <div><span className="stepCode">CONTACT</span><h3>Контакт</h3><p>Телефон, WhatsApp или Telegram</p></div>
          </article>
        </div>
      </section>

      <section className="evidenceGap" aria-label="Что полезно отправить">
        <span className="evidenceStamp">USE WHAT YOU HAVE<br />VIN · OEM · PHOTO · DESCRIPTION</span>
        <p>Не нужно знать точное название детали. Фото, OEM‑номер или описание помогут менеджеру начать подбор.</p>
      </section>

      <section className="trustProof" aria-labelledby="trust-title">
        <div className="trustProofInner">
          <div className="trustProofHead">
            <div>
              <p className="eyebrow">До выкупа</p>
              <h2 id="trust-title">Сначала покажем деталь. Потом выкупим.</h2>
            </div>
            <p className="trustProofLead">Перед покупкой отправим фото и видео детали: состояние, маркировку и заметные особенности. Вы подтверждаете — после этого выкупаем.</p>
          </div>

          <figure className="trustProofMedia">
            <div className="trustMediaGrid">
              <div className="trustMediaVideoFrame">
                <video
                  ref={trustVideo}
                  className="trustProofVideo"
                  src="/proof/video"
                  poster="/proof/poster"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
              <picture className="trustMediaPhotoFrame">
                <source media="(max-width: 700px)" srcSet="/proof/photo-mobile" />
                <img
                  src="/proof/photo-desktop"
                  alt="Реальное место поставщика автозапчастей в ОАЭ: кузовные детали и механические узлы"
                  width="960"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="trustMediaCaption">Снято у поставщиков в ОАЭ, где ищем детали.</figcaption>
          </figure>

          <dl className="trustFacts">
            <div className="trustFact">
              <span className="trustFactNo" aria-hidden="true">01</span>
              <dt>Запчасти</dt>
              <dd>Новые оригинальные, б/у оригинальные и новые аналоги.</dd>
            </div>
            <div className="trustFact">
              <span className="trustFactNo" aria-hidden="true">02</span>
              <dt>Срок поиска</dt>
              <dd>Обычно 1–3 дня.<span className="trustFactNote">Это срок поиска детали, не доставки.</span></dd>
            </div>
            <div className="trustFact">
              <span className="trustFactNo" aria-hidden="true">03</span>
              <dt>Отправка</dt>
              <dd>Из ОАЭ в Россию и страны СНГ.</dd>
            </div>
            <div className="trustFact">
              <span className="trustFactNo" aria-hidden="true">04</span>
              <dt>Доп. гарантия</dt>
              <dd>По желанию — 14 дней с момента получения, +10% к стоимости детали.<span className="trustFactNote">Условия согласуем до выкупа.</span></dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="requestSection" id="request">
        <div className="requestThreshold">
          <div className="requestThresholdInner">
            <p className="eyebrow">Request a part</p>
            <div className="requestTitleRow"><h2>Что нужно найти?</h2></div>
          </div>
        </div>

        <div className="requestBody">
          {state === "success" ? (
            <div className="success" role="status">
              <span>REQUEST RECEIVED</span>
              <h2>{requestNumber ? `Заявка №${requestNumber}` : "Заявка принята"}</h2>
              <p>Заявка принята. Менеджер продолжит подбор и при необходимости уточнит детали по указанному контакту.</p>
              <button className="secondary" onClick={() => { started.current = false; setState("idle"); }}>Отправить ещё одну</button>
            </div>
          ) : (
            <form
              ref={formRef}
              id="request-form"
              onSubmit={submitRequest}
              onFocusCapture={markRequestStart}
              onChange={markRequestStart}
              className="requestForm"
              noValidate
              data-active-step={activeStep}
              data-step-direction={stepDirection}
            >
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <nav className="formProgress" aria-label="Шаги заявки">
                <ol>
                  <li aria-current={activeStep === 1 ? "step" : undefined} data-current={activeStep === 1 ? "true" : "false"} data-complete={activeStep > 1 ? "true" : "false"}><span>01</span><b>Авто</b></li>
                  <li aria-current={activeStep === 2 ? "step" : undefined} data-current={activeStep === 2 ? "true" : "false"} data-complete={activeStep > 2 ? "true" : "false"}><span>02</span><b>Детали</b></li>
                  <li aria-current={activeStep === 3 ? "step" : undefined} data-current={activeStep === 3 ? "true" : "false"}><span>03</span><b>Контакт</b></li>
                </ol>
                <p>Шаг {activeStep} из 3</p>
              </nav>

              <fieldset
                className="formGroup"
                data-form-step="1"
                data-active={activeStep === 1 ? "true" : "false"}
                aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}
              >
                <legend><span>01</span><b>Автомобиль</b></legend>
                <p className="fieldNote">Нет VIN? Укажите марку, модель и год.</p>
                <label>VIN<input name="vin" placeholder="Например: JT..." autoCapitalize="characters" aria-invalid={fieldErrors.vehicle ? "true" : undefined} /></label>
                {fieldErrors.vehicle && <p className="fieldError" id="vehicle-error" role="alert">{fieldErrors.vehicle}</p>}
                <div className="or"><span>или</span></div>
                <div className="grid3">
                  <label>Марка<input name="carMake" placeholder="Toyota" /></label>
                  <label>Модель<input name="carModel" placeholder="Camry" /></label>
                  <label>Год<input name="carYear" inputMode="numeric" placeholder="2022" aria-invalid={fieldErrors.year ? "true" : undefined} aria-describedby={fieldErrors.year ? "year-error" : undefined} /></label>
                </div>
                {fieldErrors.year && <p className="fieldError" id="year-error" role="alert">{fieldErrors.year}</p>}
              </fieldset>

              <fieldset
                className="formGroup"
                data-form-step="2"
                data-active={activeStep === 2 ? "true" : "false"}
                aria-describedby={partErrorId !== null && fieldErrors.part ? `part-${partErrorId}-error` : undefined}
              >
                <legend><span>02</span><b>Детали</b></legend>
                <p className="fieldNote">Для одного автомобиля можно добавить несколько деталей. Не знаете OEM? Фото, название или описание тоже подходят.</p>

                <div className="partEntries">
                  {parts.map((part, index) => {
                    const partInvalid = partErrorId === part.id && Boolean(fieldErrors.part);
                    const photoInvalid = partErrorId === part.id && Boolean(fieldErrors.photo);
                    return (
                      <div className="partEntry" key={part.id}>
                        <div className="partEntryHead">
                          <h4>Деталь {index + 1}</h4>
                          {parts.length > 1 && (
                            <button className="removePartButton" type="button" aria-label={`Удалить деталь ${index + 1}`} onClick={() => removePart(part.id)}>Удалить</button>
                          )}
                        </div>
                        <div className="partGrid">
                          <label>
                            Название детали
                            <input
                              name={`part-${part.id}-name`}
                              aria-label={index === 0 ? "Название детали" : `Название детали ${index + 1}`}
                              placeholder="Например: передняя фара"
                              aria-invalid={partInvalid ? "true" : undefined}
                            />
                          </label>
                          <label>
                            OEM / Part Number
                            <input
                              name={`part-${part.id}-number`}
                              aria-label={index === 0 ? "OEM / Part Number" : `OEM / Part Number ${index + 1}`}
                              placeholder="Если известен"
                            />
                          </label>
                        </div>
                        {partInvalid && <p className="fieldError" id={`part-${part.id}-error`} role="alert">{fieldErrors.part}</p>}

                        <label className="fileLabel">
                          <span className="fileLabelText">Фото детали</span>
                          <span className="fileControl">
                            <span className="fileAction">Выбрать фото</span>
                            <span className="fileName">{part.photoName || "JPG, PNG, HEIC · до 8 МБ"}</span>
                          </span>
                          <input
                            name={`part-${part.id}-photo`}
                            aria-label={index === 0 ? "Фото детали" : `Фото детали ${index + 1}`}
                            type="file"
                            accept="image/*"
                            aria-invalid={photoInvalid ? "true" : undefined}
                            aria-describedby={photoInvalid ? `part-${part.id}-photo-error` : undefined}
                            onChange={(event) => setPartPhotoName(part.id, event.currentTarget.files?.[0]?.name ?? "")}
                          />
                        </label>
                        {photoInvalid && <p className="fieldError" id={`part-${part.id}-photo-error`} role="alert">{fieldErrors.photo}</p>}

                        <label>
                          Комментарий
                          <textarea
                            name={`part-${part.id}-description`}
                            aria-label={index === 0 ? "Комментарий" : `Комментарий ${index + 1}`}
                            rows={3}
                            placeholder="Сторона, повреждение или любая полезная деталь"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>

                <button className="addPartButton" type="button" onClick={addPart}>+ Добавить ещё деталь</button>
              </fieldset>

              <fieldset
                className="formGroup"
                data-form-step="3"
                data-active={activeStep === 3 ? "true" : "false"}
                aria-describedby={fieldErrors.contact ? "contact-error" : undefined}
              >
                <legend><span>03</span><b>Контакт</b></legend>
                <p className="fieldNote">Укажите удобный контакт, чтобы менеджер мог продолжить подбор.</p>
                <label>Телефон / WhatsApp / Telegram<input name="contact" placeholder="Как с вами связаться" aria-invalid={fieldErrors.contact ? "true" : undefined} aria-describedby={fieldErrors.contact ? "contact-error" : undefined} /></label>
                {fieldErrors.contact && <p className="fieldError" id="contact-error" role="alert">{fieldErrors.contact}</p>}
                <label>Имя <span>(необязательно)</span><input name="clientName" placeholder="Ваше имя" /></label>
              </fieldset>

              <div className="formStepActions" aria-label="Навигация по шагам">
                {activeStep > 1 && <button className="stepBack" type="button" onClick={goBack}>← Назад</button>}
                {activeStep < 3 && <button className="stepNext" type="button" onClick={goNext}>Далее →</button>}
              </div>

              {state === "error" && message && <p className="error" role="alert">{message}</p>}
              <button className="primary submit" disabled={state === "loading"} type="submit">{state === "loading" ? "Отправляем…" : "Отправить заявку"}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}