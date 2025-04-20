import {
  standarPriceFormatter,
  translateStatusToSpanish,
  translateTypeToSpanish,
} from '../service/formatterUtils.js';
import '../css/card.css'; // puedes compartir estilos con Astro

type CardPropiedadProps = {
  property: any;
  width?: string;
  height?: string;
  marginBottom?: string;
  marginRight?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};

export default function CardPropiedad({
  property,
  width,
  height,
  marginBottom,
  marginRight,
  flexGrow = 1,
  flexShrink = 1,
  flexBasis = '250px',
}: CardPropiedadProps) {
  const {
    price,
    slug,
    mainImage,
    formattedAddress,
    type,
    status,
    toilet,
    bedroom,
    parking,
    landSquareMeters,
    builtSquareMeters,
  } = property;

  const cardStyle = {
    width,
    height,
    marginBottom,
    marginRight,
    flexGrow,
    flexShrink,
    flexBasis,
  };

  return (
    <>
      <a
        href={`/propiedades/${slug}`}
        className="card-container card-link-wrapper"
        style={cardStyle}
      >
        <img src={mainImage} alt="" />
        <div className="card-content">
          {/* STATUS TAG */}
          <div className="status-tag-container">
            <span className="status-tag-text">{translateStatusToSpanish(status)}</span>
          </div>

          {/* BODY */}
          <div className="body-card-container">
            <span className="card-property-price">{standarPriceFormatter(price)}</span>
          </div>

          {/* FOOTER CARD */}
          <div className="footer-card-container">
            <div className="footer-card-container-address">
              <p className="footer-card-text">{formattedAddress}</p>
              <p className="footer-card-text">
                {`${landSquareMeters}m² Terreno | ${builtSquareMeters}m² Construcción`}
              </p>
              <ul>
                <li>
                  <i className="fa-solid fa-tags"></i> {translateTypeToSpanish(type)}
                </li>
                <li>
                  <i className="fa-solid fa-bed"></i> {bedroom}
                </li>
                <li>
                  <i className="fa-solid fa-toilet"></i> {toilet}
                </li>
                <li>
                  <i className="fa-solid fa-car"></i> {parking}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
