import { ReactComponent as ButtonArrow } from "../../img/icons/button-arrow.svg";

type SliderButtonsProps = {
  onClickPrev?: () => void;
  onClickNext?: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  classNames: string[];
}

export function SliderButtons({onClickPrev, onClickNext, isPrevDisabled, isNextDisabled, classNames}: SliderButtonsProps): JSX.Element {
  return (
    <div className={`slider-buttons ${classNames[0]}`}>
      <button className={`button slider-btn slider-btn--prev ${classNames[1]}`} type="button" onClick={onClickPrev} disabled={isPrevDisabled}>
        <ButtonArrow style={{transform: 'rotate(180deg)'}}/>
        <span className="visually-hidden">Previous slide</span>
      </button>
      <button className={`button slider-btn slider-btn--next ${classNames[2]}`} type="button" onClick={onClickNext} disabled={isNextDisabled}>
        <ButtonArrow/>
        <span className="visually-hidden">Next slide</span>
      </button>
    </div>
  )
}
