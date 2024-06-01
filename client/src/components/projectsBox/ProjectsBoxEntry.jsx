export const ProjectsBoxEntry = ({ href, label, description }) => {
    return (
        <a href={href} target='_blank' rel='noreferrer'>
            <p className={`ulDetails ${label}`}>{description}</p>
        </a>
    );
};
