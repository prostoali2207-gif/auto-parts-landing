"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/create-landing-request";
const ANALYTICS_ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/track-landing-event";
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

type SubmitState = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"vehicle" | "year" | "part" | "photo" | "contact", string>>;
type FunnelEvent = "landing_view" | "request_start" | "request_submit" | "request_error";

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
  const [photoName, setPhotoName] = useState("");
  const sessionId = useRef("");
  const started = useRef(false);

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

  function failField(form: HTMLFormElement, errors: FieldErrors, name: string) {
    setFieldErrors(errors);
    setState("error");
    setMessage("");
    requestAnimationFrame(() => focusField(form, name));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const v = new FormData(form);
    const text = (n: string) => String(v.get(n) ?? "").trim();
    const contact = text("contact");
    const vin = text("vin");
    const carMake = text("carMake");
    const carModel = text("carModel");
    const carYear = text("carYear");
    const partName = text("partName");
    const partNumber = text("partNumber");
    const description = text("description");
    const photo = v.get("photo");
    const hasPhoto = photo instanceof File && photo.size > 0;
    setFieldErrors({});
    setMessage("");

    if (!vin && !(carMake && carModel && carYear)) {
      failField(form, { vehicle: "Укажите VIN или марку, модель и год автомобиля." }, "vin");
      return;
    }
    if (carYear) {
      const y = Number(carYear);
      if (!Number.isInteger(y) || y < 1950 || y > 2100) {
        failField(form, { year: "Проверьте год автомобиля." }, "carYear");
        return;
      }
    }
    if (!partName && !partNumber && !description && !hasPhoto) {
      failField(form, { part: "Добавьте название, OEM/Part Number, описание или фото детали." }, "partName");
      return;
    }
    if (hasPhoto && photo instanceof File) {
      if (!photo.type.startsWith("image/")) {
        failField(form, { photo: "Можно загружать только изображения." }, "photo");
        return;
      }
      if (photo.size > MAX_PHOTO_BYTES) {
        failField(form, { photo: "Фотография слишком большая. Максимум 8 МБ." }, "photo");
        return;
      }
    }
    if (!contact) {
      failField(form, { contact: "Укажите телефон, WhatsApp или Telegram." }, "contact");
      return;
    }

    const photoKeys = hasPhoto ? ["part-0-photo-0"] : [];
    const body = new FormData();
    for (const key of ["contact", "clientName", "vin", "carMake", "carModel", "carYear", "website"]) {
      const value = v.get(key);
      if (typeof value === "string") body.set(key, value);
    }
    body.set("analyticsSession", sessionId.current);
    body.set("parts", JSON.stringify([{ partName, partNumber, description, photoKeys }]));
    if (photoKeys.length && photo instanceof File) body.set(photoKeys[0], photo);
    setState("loading");
    track("request_submit");

    try {
      const response = await fetch(ENDPOINT, { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось отправить заявку");
      setRequestNumber(data.requestNumber ?? null);
      setState("success");
      setPhotoName("");
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
        <a className="brand" href="#top" aria-label="Spline">
          <img src="/spline-wordmark.svg" width="103" height="24" alt="Spline" />
        </a>
        <a className="topCta" href="#request">Запросить</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <h1>Нужна <span className="routeWord">запчасть?</span> Покажите машину и деталь.</h1>
          <p className="lead">VIN или марка, модель и год — плюс фото, название, OEM‑номер или описание детали. Добавьте контакт — заявка уйдёт менеджеру.</p>
          <div className="heroActions">
            <a className="primary" href="#request">Запросить запчасть</a>
            <span className="micro">Можно начать без точного названия детали.</span>
          </div>
        </div>

        <aside className="packageEvidence" aria-label="Какие данные помогают найти деталь">
          <div className="packagePlane" aria-hidden="true" />
          <div className="shippingLabel">
            <small>PART IDENTIFICATION</small>
            <strong>Данные для заявки</strong>
            <dl>
              <div><dt>VEHICLE</dt><dd>VIN / марка · модель · год</dd></div>
              <div><dt>PART</dt><dd>фото / название / OEM / описание</dd></div>
              <div><dt>CONTACT</dt><dd>телефон / мессенджер</dd></div>
            </dl>
            <div className="barcode" aria-hidden="true" />
          </div>
          <div className="packageTape" aria-hidden="true">ROUTE → REQUEST</div>
        </aside>
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

      <section className="requestSection" id="request">
        <div className="requestThreshold">
          <div className="requestThresholdInner">
            <p className="eyebrow">Request a part</p>
            <div className="requestTitleRow"><h2>Что нужно найти?</h2><span aria-hidden="true">01</span></div>
          </div>
        </div>

        <div className="requestBody">
          {state === "success" ? (
            <div className="success" role="status">
              <span>REQUEST RECEIVED</span>
              <h2>{requestNumber ? `Заявка №${requestNumber}` : "Заявка принята"}</h2>
              <p>Заявка принята в рабочую систему Spline. Менеджер продолжит подбор и при необходимости уточнит детали по указанному контакту.</p>
              <button className="secondary" onClick={() => { started.current = false; setState("idle"); }}>Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={submitRequest} onFocusCapture={markRequestStart} onChange={markRequestStart} className="requestForm" noValidate>
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <fieldset className="formGroup" aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}>
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

              <fieldset className="formGroup" aria-describedby={fieldErrors.part ? "part-error" : undefined}>
                <legend><span>02</span><b>Деталь</b></legend>
                <p className="fieldNote">Не знаете OEM? Фото, название или описание тоже подходят.</p>
                <div className="partGrid">
                  <label>Название детали<input name="partName" placeholder="Например: передняя фара" aria-invalid={fieldErrors.part ? "true" : undefined} /></label>
                  <label>OEM / Part Number<input name="partNumber" placeholder="Если известен" /></label>
                </div>
                {fieldErrors.part && <p className="fieldError" id="part-error" role="alert">{fieldErrors.part}</p>}
                <label className="fileLabel">
                  <span className="fileLabelText">Фото детали</span>
                  <span className="fileControl">
                    <span className="fileAction">Выбрать фото</span>
                    <span className="fileName">{photoName || "JPG, PNG, HEIC · до 8 МБ"}</span>
                  </span>
                  <input name="photo" type="file" accept="image/*" aria-invalid={fieldErrors.photo ? "true" : undefined} aria-describedby={fieldErrors.photo ? "photo-error" : undefined} onChange={(event) => setPhotoName(event.currentTarget.files?.[0]?.name ?? "")} />
                </label>
                {fieldErrors.photo && <p className="fieldError" id="photo-error" role="alert">{fieldErrors.photo}</p>}
                <label>Комментарий<textarea name="description" rows={3} placeholder="Сторона, повреждение или любая полезная деталь" /></label>
              </fieldset>

              <fieldset className="formGroup" aria-describedby={fieldErrors.contact ? "contact-error" : undefined}>
                <legend><span>03</span><b>Контакт</b></legend>
                <p className="fieldNote">Укажите удобный контакт, чтобы менеджер мог продолжить подбор.</p>
                <label>Телефон / WhatsApp / Telegram<input name="contact" placeholder="Как с вами связаться" aria-invalid={fieldErrors.contact ? "true" : undefined} aria-describedby={fieldErrors.contact ? "contact-error" : undefined} /></label>
                {fieldErrors.contact && <p className="fieldError" id="contact-error" role="alert">{fieldErrors.contact}</p>}
                <label>Имя <span>(необязательно)</span><input name="clientName" placeholder="Ваше имя" /></label>
              </fieldset>

              {state === "error" && message && <p className="error" role="alert">{message}</p>}
              <button className="primary submit" disabled={state === "loading"} type="submit">{state === "loading" ? "Отправляем…" : "Отправить заявку"}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
