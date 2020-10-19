import React from 'react';


const SectionWrapper = props => {
    return (
        <div className={`section-wrapper ${props.sectionClassNames}`} id={props.sectionID}>
            <div className={`inner-wrapper ${props.innerClassNames}`} id={props.innerID}>
                {props.children}
            </div>
        </div>
    )
}

export default SectionWrapper;