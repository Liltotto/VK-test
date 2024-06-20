
import "./footer.scss";

function Footer() {
    return (
        <div className="footer">
            <div className="footer__left">
                <span className="footer__left-item">+7 928 254-08-80</span>
                <span className="footer__left-item">sm928@mail.ru</span>
            </div>

            <div className="footer__right">
                <a href="https://t.me/rega522" className="footer__right-item _directions">My Telegram</a>
                <a href="https://github.com/Liltotto" className="footer__right-item _directions">My Github</a>
            </div>
        </div>
    );
}

export default Footer;