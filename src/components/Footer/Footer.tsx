
import "./footer.scss";

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__left">
                <span className="footer__left-item">+7 499 391-66-69</span>
                <span className="footer__left-item">mail@greensight.ru</span>
            </div>

            <div className="footer__right">
                <span className="footer__right-item">322A, 2nd Floor, Zelenograd, Moscow, Russia</span>
                <span className="footer__right-item footer__right-item_directions">Directions</span>
            </div>
        </div>
    );
}

export default Footer;