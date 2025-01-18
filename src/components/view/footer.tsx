import styled from '@emotion/styled';

export const Footer = () => {
    return (
        <FooterBase>
            <FooterText>this is a footer</FooterText>
        </FooterBase>
    );
};

const FooterBase = styled('footer')({
    opacity: 0,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10vh',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '1.5rem',
    transform: 'translateY(30vh)'
});

const FooterText = styled('span')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    color: 'white'
});
