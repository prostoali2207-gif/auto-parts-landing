"use client";

import { FormEvent, useState } from "react";

const ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/create-landing-request";
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

type SubmitState = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"vehicle" | "year" | "part" | "photo" | "contact", string>>;

export default function Home() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestNumber, setRequestNumber] = useState<number | null>(null);

  function focusField(form: HTMLFormElement, name: string) {
    const field = form.elements.namedItem(name);
    if (field instanceof HTMLElement) {
      field.focus();
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function failField(form: HTMLFormElement, errors: FieldErrors, fieldName: string) {
    setFieldErrors(errors);
    setState("error");
    setMessage("");
    requestAnimationFrame(() => focusField(form, fieldName));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const text = (name: string) => String(values.get(name) ?? "").trim();

    const contact = text("contact");
    const vin = text("vin");
    const carMake = text("carMake");
    const carModel = text("carModel");
    const carYear = text("carYear");
    const partName = text("partName");
    const partNumber = text("partNumber");
    const description = text("description");
    const photo = values.get("photo");
    const hasPhoto = photo instanceof File && photo.size > 0;

    setFieldErrors({});
    setMessage("");

    if (!vin && !(carMake && carModel && carYear)) {
      failField(form, { vehicle: "Укажите VIN или марку, модель и год автомобиля." }, "vin");
      return;
    }

    if (carYear) {
      const year = Number(carYear);
      if (!Number.isInteger(year) || year < 1950 || year > 2100) {
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
      const value = values.get(key);
      if (typeof value === "string") body.set(key, value);
    }
    body.set("parts", JSON.stringify([{ partName, partNumber, description, photoKeys }]));
    if (photoKeys.length && photo instanceof File) body.set(photoKeys[0], photo);

    setState("loading");

    try {
      const response = await fetch(ENDPOINT, { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Не удалось отправить заявку");
      setRequestNumber(data.requestNumber ?? null);
      setState("success");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
      setState("error");
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Das Motors">
          <span className="brandMark">DM</span>
          <span>DAS MOTORS</span>
        </a>
        <a className="topCta" href="#request">Найти деталь</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Parts sourcing · UAE</p>
          <h1>Нужна запчасть? Покажите машину и деталь.</h1>
          <p className="lead">Отправьте VIN, данные автомобиля, фото или OEM‑номер. Менеджер получит всё в одной заявке и продолжит подбор.</p>
          <div className="heroActions">
            <a className="primary" href="#request">Запросить запчасть</a>
            <span className="micro">Без каталога и долгого поиска по сайту.</span>
          </div>
        </div>

        <aside className="sourcingTicket" aria-label="Что можно отправить для поиска детали">
          <div className="ticketHead">
            <span>PART REQUEST</span>
            <span>UAE / DAS MOTORS</span>
          </div>
          <div className="ticketRow">
            <span className="ticketCode">VEHICLE ID</span>
            <strong>VIN</strong>
            <small>или марка · модель · год</small>
          </div>
          <div className="ticketRow">
            <span className="ticketCode">PART ID</span>
            <strong>Фото / OEM / название</strong>
            <small>достаточно любого понятного признака</small>
          </div>
          <div className="ticketRow ticketRowLast">
            <span className="ticketCode">CONTACT</span>
            <strong>Телефон / WhatsApp / Telegram</strong>
            <small>для ответа менеджера</small>
          </div>
        </aside>
      </section>

      <section className="process">
        <div className="sectionHead">
          <p className="eyebrow">Как это работает</p>
          <h2>Одна заявка. Три понятных блока.</h2>
        </div>
        <div className="processRail">
          <article><span>01 / VEHICLE</span><h3>Покажите автомобиль</h3><p>VIN либо марка, модель и год.</p></article>
          <article><span>02 / PART</span><h3>Покажите деталь</h3><p>Фото, название, OEM‑номер или короткое описание.</p></article>
          <article><span>03 / CONTACT</span><h3>Оставьте контакт</h3><p>Заявка отправится в рабочий процесс Das Motors.</p></article>
        </div>
      </section>

      <section className="requestSection" id="request">
        <div className="requestIntro">
          <p className="eyebrow">Request a part</p>
          <h2>Что нужно найти?</h2>
          <p>Не обязательно заполнять всё. Для автомобиля достаточно VIN либо марки, модели и года. Для детали — любого понятного признака.</p>
          <div className="requestLegend" aria-label="Что можно использовать в заявке">
            <span>VIN</span><span>OEM</span><span>PHOTO</span><span>VEHICLE</span>
          </div>
        </div>

        {state === "success" ? (
          <div className="success" role="status">
            <span>REQUEST RECEIVED</span>
            <h2>{requestNumber ? `Заявка №${requestNumber}` : "Заявка принята"}</h2>
            <p>Она уже находится в CRM Das Motors.</p>
            <button className="secondary" onClick={() => setState("idle")}>Отправить ещё одну</button>
          </div>
        ) : (
          <form onSubmit={submitRequest} className="requestForm" noValidate>
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <fieldset aria-describedby={fieldErrors.vehicle ? "vehicle-error" : undefined}>
              <legend><span>01</span> Автомобиль</legend>
              <p className="fieldNote">VIN — самый короткий путь. Если его нет под рукой, укажите данные автомобиля.</p>
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

            <fieldset aria-describedby={fieldErrors.part ? "part-error" : undefined}>
              <legend><span>02</span> Деталь</legend>
              <p className="fieldNote">Можно отправить название, номер или фотографию — необязательно знать всё сразу.</p>
              <label>Название детали<input name="partName" placeholder="Например: передняя фара" aria-invalid={fieldErrors.part ? "true" : undefined} /></label>
              {fieldErrors.part && <p className="fieldError" id="part-error" role="alert">{fieldErrors.part}</p>}
              <label>OEM / Part Number<input name="partNumber" placeholder="Если известен" /></label>
              <label className="fileLabel">Фото детали<input name="photo" type="file" accept="image/*" aria-invalid={fieldErrors.photo ? "true" : undefined} aria-describedby={fieldErrors.photo ? "photo-error" : undefined} /></label>
              {fieldErrors.photo && <p className="fieldError" id="photo-error" role="alert">{fieldErrors.photo}</p>}
              <label>Комментарий<textarea name="description" rows={3} placeholder="Сторона, повреждение или любая полезная деталь" /></label>
            </fieldset>

            <fieldset aria-describedby={fieldErrors.contact ? "contact-error" : undefined}>
              <legend><span>03</span> Контакт</legend>
              <p className="fieldNote">Укажите удобный контакт, чтобы менеджер мог продолжить подбор.</p>
              <label>Телефон / WhatsApp / Telegram<input name="contact" placeholder="Как с вами связаться" aria-invalid={fieldErrors.contact ? "true" : undefined} aria-describedby={fieldErrors.contact ? "contact-error" : undefined} /></label>
              {fieldErrors.contact && <p className="fieldError" id="contact-error" role="alert">{fieldErrors.contact}</p>}
              <label>Имя <span>(необязательно)</span><input name="clientName" placeholder="Ваше имя" /></label>
            </fieldset>

            {state === "error" && message && <p className="error" role="alert">{message}</p>}
            <button className="primary submit" disabled={state === "loading"} type="submit">
              {state === "loading" ? "Отправляем…" : "Отправить заявку"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
