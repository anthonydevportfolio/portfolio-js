import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInViewport } from 'react-in-viewport';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { MQ } from '../../util';
import { cb } from '../landing/greeting';
import { Base, BaseBody, BaseContent, BaseHeader, Sentinel } from '../me/me';
import { ExperienceData, ExperienceDataItem } from './data';
import { ExperienceEntryDescription } from './experienceEntryDescription';
import { useTabBar } from './hooks';

const gradientColors = `
  #FF6F61,
  #FFB347,
  #FFD700,
  #FF77A9  
`;

export const Experience: FC = () => {
    const isMobile = window.innerWidth < 800;
    useLogger('Experience');

    const [activeTab, setActiveTab] = useState<number>(1);
    const sentinel = useRef<HTMLDivElement | null>(null);
    const sentinel2 = useRef<HTMLDivElement | null>(null);

    const baseRef = useRef<HTMLDivElement | null>(null);
    const containerHeight = useRef<number | undefined>();
    const containerSizeEstablished = useSelectorw(state => state.global.containerSizeEstablished);

    const listSentinel = useRef<HTMLDivElement | null>(null);
    const tabsContainerRef = useRef<HTMLDivElement | null>(null);

    const { inViewport: viewInViewport } = useInViewport(sentinel);
    const { inViewport: viewInViewport2 } = useInViewport(sentinel2);
    const { inViewport: listInViewport } = useInViewport(listSentinel, {});

    const barStyle = useTabBar(tabsContainerRef, activeTab, listInViewport);

    const handleTabClick = useCallback((index: number) => {
        setActiveTab(index);
    }, []);

    const tabs = useMemo(
        () =>
            ExperienceData.map((experience, index) => (
                <Tab key={index} index={index} isActive={index === activeTab} onClick={handleTabClick}>
                    {experience.company}
                </Tab>
            )),
        [activeTab, handleTabClick]
    );

    const activeExperience = ExperienceData[activeTab];

    const shouldRenderView = viewInViewport || viewInViewport2;
    const shouldRenderList = listInViewport || viewInViewport2;

    useEffect(() => {
        if (baseRef.current) {
            const newHeight = Number(baseRef.current?.clientHeight);

            if (!containerHeight.current || (!isNaN(newHeight) && newHeight > containerHeight.current)) {
                containerHeight.current = Number(baseRef.current?.clientHeight);
            }
        }
    }, [viewInViewport, listInViewport]);

    return (
        containerSizeEstablished && (
            <Base style={{ marginTop: '2rem', minHeight: containerHeight.current }} ref={baseRef}>
                <Sentinel
                    className='sentinel'
                    ref={sentinel}
                    color='blue'
                    style={{ height: '90%', marginTop: '10%', transform: 'translateX(50%)' }}
                />
                <Sentinel
                    className='sentinel'
                    ref={listSentinel}
                    color='green'
                    style={{ height: '50%', marginTop: '20%' }}
                />
                <ExperienceBase shouldRender={shouldRenderView}>
                    {shouldRenderView && (
                        <BaseBody>
                            <ExperienceHeader>Experience</ExperienceHeader>
                            <ExperienceTabs ref={tabsContainerRef}>
                                {tabs}
                                <Bar style={{ left: barStyle.left || '50%', width: barStyle.width }} />
                            </ExperienceTabs>
                            <ExperienceContentWrapper>
                                <ImageComponent src={activeExperience.img} />
                                <ExperienceContent>
                                    {shouldRenderList && <ExperienceDetails data={activeExperience} />}
                                </ExperienceContent>
                            </ExperienceContentWrapper>
                        </BaseBody>
                    )}
                </ExperienceBase>
                {isMobile && <Sentinel className='sentinel' ref={sentinel2} />}
            </Base>
        )
    );
};

interface TabProps {
    index: number;
    isActive: boolean;
    onClick: (index: number) => void;
    children: React.ReactNode;
}

const Tab: FC<TabProps> = memo(({ index, isActive, onClick, children }) => {
    const handleClick = useCallback(() => onClick(index), [onClick, index]);
    return (
        <StyledTab className={`tab ${isActive ? 'active' : ''}`} onClick={handleClick}>
            {children}
        </StyledTab>
    );
});

const StyledTab = styled('div')({
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: 'linear-gradient(135deg, white, white)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    '&:hover': {
        color: '#ff6b6b',
        background: `linear-gradient(135deg, ${gradientColors})`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    }
});

interface ExperienceDetailsProps {
    data: ExperienceDataItem;
}

const ExperienceDetails: FC<ExperienceDetailsProps> = memo(({ data }) => (
    <ExperienceDetailsWrapper>
        <ExperienceDetailFlexSection>
            <ExperienceDetailEntry className='title'>{data.title}</ExperienceDetailEntry>
            <ExperienceDetailEntry className='at'>@</ExperienceDetailEntry>
            <ExperienceDetailEntry className='company'>{data.company}</ExperienceDetailEntry>
        </ExperienceDetailFlexSection>
        <ExperienceDetailFlexSection style={{ fontStyle: 'italic' }}>
            <ExperienceDetailEntry>{data.startDate}</ExperienceDetailEntry>
            <ExperienceDetailEntry>-</ExperienceDetailEntry>
            <ExperienceDetailEntry>{data.endDate}</ExperienceDetailEntry>
        </ExperienceDetailFlexSection>
        <ExperienceEntryDescription description={data.description} />
    </ExperienceDetailsWrapper>
));

const ImageComponent: FC<{ src: string }> = memo(({ src }) => {
    const rotationRef = useRef(Math.random() * 360);

    return (
        <ImageWrapper rotation={rotationRef.current}>
            <ExperienceImage imgUrl={src} />
        </ImageWrapper>
    );
});

const Bar = styled.div({
    position: 'absolute',
    height: '3px',
    bottom: '1rem',
    backgroundImage: `linear-gradient(135deg, ${gradientColors.replace('#FFD700,', '')})`,
    transition: `left 0.3s ${cb}, width 0.3s ${cb}`
});

const ExperienceHeader = styled(BaseHeader)({
    transform: 'translateY(0vh)',

    [MQ.mobile]: {
        transform: 'translateY(0vh)'
    }
});

const up = keyframes({
    '0%': {
        transform: `translateY(50px)`
    },
    '100%': {
        transform: `translateY(0px)`
    }
});

const ExperienceBase = styled(Base)<{ shouldRender?: boolean }>(({ shouldRender = false }) => ({
    animation: shouldRender ? `${up} 2s ${cb} forwards` : 'none',
    transform: 'translateY(50px)',
    minHeight: '751px',
    gap: '0px',

    [MQ.mobile]: {
        transform: 'translateY(0)',
        animation: shouldRender ? `${up} 2s ${cb} forwards` : 'none',
        minWidth: 'unset',
        minHeight: 400
    }
}));

const ExperienceContentWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
});

const ExperienceImage = styled('div')<{ imgUrl?: string }>(({ imgUrl }) => ({
    width: '97%',
    height: '97%',
    borderRadius: '50%',
    zIndex: 2,
    transition: 'all 0.3s',
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
}));

const downAndRotate = keyframes({
    '0%': {
        transform: 'translate(13rem, -15rem) rotate(10deg)'
    },
    '100%': {
        transform: 'translate(13rem, -5rem) rotate(0deg)'
    }
});

const ImageWrapper = styled('div')<{ rotation: number }>(({ rotation }) => {
    const gradientAngle = 135 + rotation;
    const gradient = `linear-gradient(${gradientAngle}deg, ${gradientColors})`;

    return {
        width: '23rem',
        height: '23rem',
        minWidth: '23rem',
        borderRadius: '50%',
        zIndex: 0,
        transition: 'all 0.3s',
        background: gradient,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: `${downAndRotate} 2s ${cb} forwards`,
        [MQ.mobile]: {
            display: 'none'
        }
    };
});

const ExperienceContent = styled(BaseContent)({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0 auto',
    transform: 'translate(5rem, 0)',
    minWidth: '935px',
    minHeight: '50vh',

    [MQ.mobile]: {
        height: 560,
        transform: 'translate(0, 0)',
        marginTop: '30px',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start !important',
        minWidth: 'unset'
    }
});

const ExperienceTabs = styled('div')({
    columnGap: '2rem',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '10vh',

    fontSize: '1.5rem',
    flexWrap: 'wrap',
    position: 'relative'
});

const ExperienceDetailsWrapper = styled('div')({
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    width: '80%',

    fontSize: '1.5rem',
    flexWrap: 'wrap',
    rowGap: '0.5rem',
    position: 'relative',

    [MQ.mobile]: {
        width: '100%',
        fontSize: '1.2rem',
        paddingTop: 0
    }
});

const ExperienceDetailEntry = styled('div')({
    display: 'flex',
    alignItems: 'center',

    '&.title, &.at, &.company': {
        fontSize: '1.7rem',
        [MQ.desktopMedium]: {
            fontSize: '1.4rem'
        },
        [MQ.mobile]: {
            fontSize: '1.2rem',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
        }
    },
    '&.company, &.at': {
        [MQ.mobile]: {
            display: 'none'
        }
    },
    '&.company': {
        fontWeight: 'bold'
    }
});

const ExperienceDetailFlexSection = styled('div')({
    columnGap: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    width: '100%',

    fontSize: '1.2rem'
});
