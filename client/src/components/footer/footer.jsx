import './footer.css';

const Footer = () => {
    const links = [
        {
            label: 'GH',
            url: 'github.com'
        },
        {
            label: 'LI',
            url: 'linkedIn.com'
        }
    ];

    return (
        <>
            <ul className='footerList'>
                {links.map(link => {
                    return <li className='footerLink'>{link.label}</li>;
                })}
            </ul>
        </>
    );
};

export default Footer;
