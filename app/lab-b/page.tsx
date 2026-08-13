import Link from "next/link";
import "./lab-b.css";

export default function LabB() {
  return (
    <main className="labB">
      <div className="labBadgeB">VISUAL LAB · B / WORKSHOP EDITORIAL</div>
      <header className="bHeader"><img src="/spline-wordmark.svg" width="103" height="24" alt="Spline"/><nav><Link href="/lab-a">A</Link><a href="#request-b">Request a part</a></nav></header>
      <section className="bHero">
        <div className="bIssue"><span>UAE / PARTS SOURCING</span><span>ISSUE 001</span></div>
        <div className="bTitle"><p>Найти правильную деталь —<br/>это не листать каталог.</p><h1>Сначала<br/><em>понять</em><br/>задачу.</h1></div>
        <div className="bHeroSide"><p>Пришлите VIN или данные автомобиля и любой полезный сигнал о детали: название, OEM, фото или описание.</p><a href="#request-b">Передать задачу менеджеру ↘</a></div>
        <div className="bRedBlock" aria-hidden="true"><span>S</span><small>PARTS / UAE</small></div>
      </section>
      <section className="bManifesto"><p className="bCap">THE SERVICE</p><div><h2>У вас может быть только фото.<br/>Или только VIN.<br/><i>Этого уже может хватить, чтобы начать.</i></h2><p>Мы не заставляем клиента знать все идентификаторы. Заявка должна дать менеджеру достаточно информации для следующего шага.</p></div></section>
      <section className="bProcess"><article><b>Автомобиль</b><span>01</span><p>VIN<br/>или марка · модель · год</p></article><article><b>Деталь</b><span>02</span><p>Название · OEM<br/>фото · описание</p></article><article><b>Контакт</b><span>03</span><p>Телефон<br/>WhatsApp · Telegram</p></article></section>
      <section className="bRequest" id="request-b"><div className="bRequestCover"><p>REQUEST A PART</p><h2>Расскажите,<br/>что нужно<br/><i>найти.</i></h2><span>Visual prototype · CRM disabled</span></div><form className="bForm"><fieldset><legend>01 / Автомобиль</legend><p>VIN или марка, модель и год.</p><label>VIN<input placeholder="JT..."/></label><div className="bGrid3"><label>Марка<input placeholder="Toyota"/></label><label>Модель<input placeholder="Camry"/></label><label>Год<input placeholder="2022"/></label></div></fieldset><fieldset><legend>02 / Деталь</legend><p>Фото, название, OEM / Part Number или описание.</p><div className="bGrid2"><label>Название<input placeholder="Передняя фара"/></label><label>OEM / Part Number<input placeholder="Если известен"/></label></div><label>Описание<textarea rows={4} placeholder="Любая полезная деталь"/></label><button type="button" className="bPhoto">Добавить фото +</button></fieldset><fieldset><legend>03 / Контакт</legend><p>Куда менеджер сможет ответить.</p><label>Телефон / WhatsApp / Telegram<input placeholder="+971..."/></label></fieldset><button className="bSubmit" type="button"><span>Отправить заявку</span><b>↗</b></button></form></section>
    </main>
  );
}
