"use client";

import { useRef, useState } from "react";

const supplierPhotos = [
  {
    src: "https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyFwSIl4DSmyJVLt9bW4ap9Fn/36679397-b3f2-4471-a211-cadb874e7e5c.jpg",
    alt: "Стеллажи с передними кузовными частями автомобилей BMW на площадке поставщика",
    label: "BMW / Кузовные детали",
    width: 1536,
    height: 864,
  },
  {
    src: "https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyFwSIl4DSmyJVLt9bW4ap9Fn/db3d1dad-2d21-484a-8941-e52e7ce10041.jpg",
    alt: "Передние кузовные части Audi в несколько ярусов на стеллажах",
    label: "AUDI / Кузовные детали",
    width: 1152,
    height: 1536,
  },
  {
    src: "https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyFwSIl4DSmyJVLt9bW4ap9Fn/e996f70b-2591-481f-9917-e40edf14a6c9.jpg",
    alt: "Ряды фар и передних кузовных частей Mercedes-Benz на складе",
    label: "MERCEDES-BENZ / Оптика",
    width: 864,
    height: 1536,
  },
  {
    src: "https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyFwSIl4DSmyJVLt9bW4ap9Fn/e39832f2-f2e0-4555-a771-cc74fff9d39f.jpg",
    alt: "Ряды передних частей автомобилей разных марок и двигатели в помещении поставщика",
    label: "РАЗНЫЕ МАРКИ / Узлы и кузов",
    width: 1152,
    height: 1536,
  },
  {
    src: "https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyFwSIl4DSmyJVLt9bW4ap9Fn/8d0e155f-0eb7-40a5-9731-843a8f592125.jpg",
    alt: "Передние части Mercedes-Benz и двигатель на открытой площадке поставщика",
    label: "MERCEDES-BENZ / Двигатели и кузов",
    width: 864,
    height: 1536,
  },
] as const;

export default function SupplierGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll<HTMLElement>(".supplierSlide");
    const first = items[0];
    const target = items[index];
    if (!first || !target) return;
    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    setActive(index);
  }

  function syncActive() {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>(".supplierSlide"));
    const first = items[0];
    if (!first) return;
    const nearest = items.reduce((best, item, index) => {
      const distance = Math.abs(item.offsetLeft - first.offsetLeft - track.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Infinity });
    setActive(nearest.index);
  }

  function openPhoto(index: number) {
    setExpanded(index);
    dialogRef.current?.showModal();
  }

  function closePhoto() {
    dialogRef.current?.close();
  }

  return (
    <div className="supplierGallery" aria-label="Фотографии площадок поставщиков">
      <div className="supplierGalleryToolbar">
        <div className="supplierGalleryIntro">
          <span className="supplierGalleryKicker">РЕАЛЬНЫЕ ФОТО / ОАЭ</span>
          <h3>Детали, которые можно увидеть.</h3>
        </div>
        <div className="supplierGalleryControls">
          <span className="supplierGalleryCounter" aria-live="polite">
            {String(active + 1).padStart(2, "0")} <span>/</span> {String(supplierPhotos.length).padStart(2, "0")}
          </span>
          <button type="button" className="supplierGalleryArrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Предыдущее фото">←</button>
          <button type="button" className="supplierGalleryArrow" onClick={() => goTo(active + 1)} disabled={active === supplierPhotos.length - 1} aria-label="Следующее фото">→</button>
        </div>
      </div>

      <ul className="supplierGalleryTrack" ref={trackRef} onScroll={syncActive} tabIndex={0} aria-label="Листайте фотографии вправо или влево">
        {supplierPhotos.map((photo, index) => (
          <li className="supplierSlide" key={photo.src}>
            <button type="button" className="supplierPhotoButton" aria-label={`Открыть фото ${index + 1}: ${photo.label}`} onClick={() => openPhoto(index)}>
              <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
              <span className="supplierPhotoFooter">
                <span>{photo.label}</span>
                <span className="supplierPhotoExpand" aria-hidden="true">↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="supplierGalleryFoot">
        <p>Снято у поставщиков в ОАЭ, где ищем детали.</p>
        <a href="#request" className="supplierGalleryLink">Подобрать запчасть <span aria-hidden="true">↗</span></a>
      </div>

      <dialog
        ref={dialogRef}
        className="supplierGalleryDialog"
        aria-label="Просмотр фотографии"
        onClose={() => setExpanded(null)}
        onClick={(event) => { if (event.target === dialogRef.current) closePhoto(); }}
        onKeyDown={(event) => {
          if (expanded === null) return;
          if (event.key === "ArrowRight") { event.preventDefault(); setExpanded((expanded + 1) % supplierPhotos.length); }
          if (event.key === "ArrowLeft") { event.preventDefault(); setExpanded((expanded - 1 + supplierPhotos.length) % supplierPhotos.length); }
        }}
      >
        {expanded !== null && (
          <div className="supplierGalleryDialogBody">
            <div className="supplierGalleryDialogTop">
              <span>{String(expanded + 1).padStart(2, "0")} / {String(supplierPhotos.length).padStart(2, "0")}</span>
              <button type="button" onClick={closePhoto} aria-label="Закрыть фотографию">Закрыть ×</button>
            </div>
            <img
              src={supplierPhotos[expanded].src}
              alt={supplierPhotos[expanded].alt}
              width={supplierPhotos[expanded].width}
              height={supplierPhotos[expanded].height}
            />
            <div className="supplierGalleryDialogBottom">
              <button type="button" onClick={() => setExpanded((expanded - 1 + supplierPhotos.length) % supplierPhotos.length)} aria-label="Предыдущее увеличенное фото">←</button>
              <span>{supplierPhotos[expanded].label}</span>
              <button type="button" onClick={() => setExpanded((expanded + 1) % supplierPhotos.length)} aria-label="Следующее увеличенное фото">→</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
