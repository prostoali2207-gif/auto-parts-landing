import Link from "next/link";
import "./lab-a.css";

export default function LabA() {
  return (
    <main className="labA">
      <div className="labBadge">VISUAL LAB · A / EXPLODED PRECISION</div>
      <header className="labHeader">
        <img src="/spline-wordmark.svg" width="103" height="24" alt="Spline" />
        <nav><Link href="/lab-b">B</Link><a href="#request-a">Запросить деталь</a></nav>
      </header>

      <section className="aHero">
        <div className="aHeroCopy">
          <p className="aKicker">AUTO PARTS SOURCING · UAE</p>
          <h1>Проблема<br/><span>становится</span><br/>деталью.</h1>
          <p className="aLead">Покажите автомобиль и то, что нужно найти. VIN, фото, OEM или описание — достаточно одного полезного сигнала, чтобы начать подбор.</p>
          <a className="aPrimary" href="#request-a">Начать запрос <b>↘</b></a>
        </div>

        <div className="mechanism" aria-hidden="true">
          <div className="mechDisc discOne" />
          <div className="mechDisc discTwo" />
          <div className="mechDisc discThree" />
          <div className="mechBar barOne" />
          <div className="mechBar barTwo" />
          <div className="mechCore">?</div>
          <span className="mechNote n1">VEHICLE</span>
          <span className="mechNote n2">PART</span>
          <span className="mechNote n3">MATCH</span>
        </div>
        <span className="aIndex">01—03</span>
      </section>

      <section className="aProcess">
        <div className="aProcessIntro"><p>ТРИ ВХОДА</p><h2>Не каталог.<br/>Точная постановка задачи.</h2></div>
        <div className="aSteps">
          <article><span>01</span><h3>Автомобиль</h3><p>VIN или марка, модель и год.</p></article>
          <article><span>02</span><h3>Деталь</h3><p>Название, OEM / Part Number, фото или описание.</p></article>
          <article><span>03</span><h3>Контакт</h3><p>Телефон, WhatsApp или Telegram.</p></article>
        </div>
      </section>

      <section className="aStatement">
        <p>USE WHAT YOU HAVE</p>
        <h2>Не нужно знать все номера.<br/>Нужно дать <i>достаточно, чтобы начать.</i></h2>
      </section>

      <section className="aRequest" id="request-a">
        <div className="aRequestHead">
          <span>REQUEST / 001</span>
          <h2>Что ищем?</h2>
          <p>Прототип формы. Ничего отсюда не отправляется в CRM.</p>
        </div>
        <form className="aForm">
          <fieldset>
            <legend><b>Автомобиль</b><span>VIN или данные машины</span></legend>
            <label>VIN<input placeholder="JT..." /></label>
            <div className="aGrid3"><label>Марка<input placeholder="Toyota" /></label><label>Модель<input placeholder="Camry" /></label><label>Год<input placeholder="2022" /></label></div>
          </fieldset>
          <fieldset>
            <legend><b>Деталь</b><span>Любой полезный сигнал</span></legend>
            <div className="aGrid2"><label>Название<input placeholder="Передняя фара" /></label><label>OEM / Part Number<input placeholder="Если известен" /></label></div>
            <label>Описание<textarea rows={4} placeholder="Сторона, повреждение или другая полезная деталь" /></label>
            <button type="button" className="aUpload">+ Добавить фото</button>
          </fieldset>
          <fieldset>
            <legend><b>Контакт</b><span>Куда ответить</span></legend>
            <label>Телефон / WhatsApp / Telegram<input placeholder="+971..." /></label>
          </fieldset>
          <button type="button" className="aSubmit">Отправить заявку <b>→</b></button>
        </form>
      </section>
    </main>
  );
}
