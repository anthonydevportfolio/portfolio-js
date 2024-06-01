export const Links = () => {
    return(
        <div className="linksBox">
            <div className="links-social">
                {socials.map(social => <Img type={'social'} link={social} />)}
            </div>
            <div className="links-languages">
                {languages.map(language => <Img type={'language'} link={language} />)}
            </div>
        </div>
    )
}

const Img = ({link, type}) => {
    return <img src={link[0]} className={`introIcon ${type}Icon`} alt='language icon ts, js, java' onClick={() => {
        if(type === 'social') {
            window.open(link[1], '_blank')
        }
    }} />
}

const socials = [
    [
        'https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473',
        'https://www.linkedin.com/in/anthony-griffin-0513271aa/'
    ],
    ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s', 
        'https://github.com/anthony4834'
    ],
    ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4h4yf5vhuu8_Dqf5VC1l1tFbIJ88N4H24jg&s', 'https://leetcode.com/u/Anthony4834/']

]
const languages = [
    ['https://education.oracle.com/file/general/p-80-java.png'],
    ['https://media.licdn.com/dms/image/D4D12AQEL9aeB8WqRaw/article-cover_image-shrink_600_2000/0/1685204779306?e=2147483647&v=beta&t=jr7Um-vZDvcgCCzx0a48zCEr3RtUyRVqelGOzrpL4bs'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png']
]
