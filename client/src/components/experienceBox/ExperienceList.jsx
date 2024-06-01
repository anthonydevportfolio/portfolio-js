const ExperienceList = ({ listRef, experience, handleClick }) => (
    <ul className='experienceList' ref={listRef}>
        {Object.keys(experience).map((item, key) => (
            <li key={key} onClick={() => handleClick(item)}>
                {experience[item].name}
            </li>
        ))}
    </ul>
);

export default ExperienceList;
