"use client";

import { FormEvent, useState } from "react";

const ENDPOINT = "https://ybjoayhahbifcrrrykln.supabase.co/functions/v1/create-landing-request";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [requestNumber, setRequestNumber] = useState<number | null>(null);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;

    const form = event.currentTarget;
    const values = new FormData(form);
    const photo = values.get("photo");
    const photoKeys = photo instanceof File && photo.size > 0 ? ["part-0-photo-0"] : [];

    const body = new FormData();
    for (const key of ["contact", "clientName", "vin", "carMake", "carModel", "carYear", "website"]) {
      const value = values.get(key);
      if (typeof value === "string") body.set(key, value);
    }
    body.set("parts", JSON.stringify([{ partName: values.get("partName") || "", partNumber: values.get("partNumber") || "", description: values.get("description") || "", photoKeys }]));
    if (photoKeys.length && photo instanceof File) body.set(photoKeys[0], photo);

    setState("loading");
    setMessage("");

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
        <a className="brand" href="#top" aria-label="Das Motors">DAS MOTORS</a>
        <a className="topCta" href="#request">Найти деталь</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">Автозапчасти · ОАЭ</p>
          <h1>Найдём нужную деталь для вашего автомобиля</h1>
          <p className="lead">Отправьте VIN, фото детали или OEM‑номер. Менеджер получит заявку и продолжит подбор.</p>
          <a className="primary" href="#request">Запросить запчасть</a>
          <p className="micro">Без каталога и долгого поиска по сайту.</p>
        </div>
        <div className="heroPanel" aria-label="Как отправить запрос">
          <span>01</span><strong>VIN или данные авто</strong>
          <span>02</span><strong>Фото, название или OEM</strong>
          <span>03</span><strong>Ваш контакт</strong>
        </div>
      </section>

      <section className="process">
        <p className="eyebrow">Как это работает</p>
        <h2>Три шага до заявки менеджеру</h2>
        <div className="steps">
          <div><b>1</b><h3>Покажите автомобиль</h3><p>VIN или марка, модель и год.</p></div>
          <div><b>2</b><h3>Покажите деталь</h3><p>Фото, название, OEM‑номер или короткое описание.</p></div>
          <div><b>3</b><h3>Оставьте контакт</h3><p>Заявка сразу попадает в рабочий процесс Das Motors.</p></div>
        </div>
      </section>

      <section className="requestSection" id="request">
        <div className="requestIntro">
          <p className="eyebrow">Request a part</p>
          <h2>Что нужно найти?</h2>
          <p>Не обязательно заполнять всё. Для автомобиля достаточно VIN либо марки, модели и года. Для детали — любого понятного признака.</p>
        </div>

        {state === "success" ? (
          <div className="success" role="status">
            <span>Заявка отправлена</span>
            <h2>{requestNumber ? `Заявка №${requestNumber}` : "Заявка принята"}</h2>
            <p>Она уже находится в CRM Das Motors.</p>
            <button className="secondary" onClick={() => setState("idle")}>Отправить ещё одну</button>
          </div>
        ) : (
          <form onSubmit={submitRequest} className="requestForm">
            <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <fieldset>
              <legend>1. Автомобиль</legend>
              <label>VIN<input name="vin" placeholder="Например: JT..." autoCapitalize="characters" /></label>
              <div className="or">или</div>
              <div className="grid3">
                <label>Марка<input name="carMake" placeholder="Toyota" /></label>
                <label>Модель<input name="carModel" placeholder="Camry" /></label>
                <label>Год<input name="carYear" inputMode="numeric" placeholder="2022" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>2. Деталь</legend>
              <label>Название детали<input name="partName" placeholder="Например: передняя фара" /></label>
              <label>OEM / Part Number<input name="partNumber" placeholder="Если известен" /></label>
              <label>Фото детали<input name="photo" type="file" accept="image/*" /></label>
              <label>Комментарий<textarea name="description" rows={3} placeholder="Сторона, повреждение или любая полезная деталь" /></label>
            </fieldset>

            <fieldset>
              <legend>3. Контакт</legend>
              <label>Телефон / WhatsApp / Telegram<input name="contact" required placeholder="Как с вами связаться" /></label>
              <label>Имя <span>(необязательно)</span><input name="clientName" placeholder="Ваше имя" /></label>
            </fieldset>

            {state === "error" && <p className="error" role="alert">{message}</p>}
            <button className="primary submit" disabled={state === "loading"} type="submit">
              {state === "loading" ? "Отправляем…" : "Отправить заявку"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
