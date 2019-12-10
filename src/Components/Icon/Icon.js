import React from 'react';
import svgSprite from "../../assets/svgs/svg-sprite.min.svg";


class Icon extends React.Component {
  render(){

    return (
      <svg className={this.props.class}>
        <use
          xlinkHref={`${svgSprite}#wmnds-${this.props.iconName}`}
          href={`${svgSprite}#wmnds-${this.props.iconName}`}
        ></use>
      </svg>
    );
  }
}

export default Icon;
