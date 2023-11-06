const Header = ({ mainHeading, details }) => {
    return (
        <div>
            <div style={{ backgroundColor: "#c7222a", display: "flex", color: "white", justifyContent: 'center' }}>
                <h4 className="pt-4 pb-4" >{mainHeading}</h4>
            </div>
            <div style={{ backgroundColor: 'lightgrey' }}>
                <h6 className="mx-3 px-2 pt-3 pb-3">{details}</h6>
            </div>
        </div>
    );
};
export default Header;