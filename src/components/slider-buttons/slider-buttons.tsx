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
      <button className={`button slider-btn slider-btn--prev ${classNames[1]}`} onClick={onClickPrev} disabled={isPrevDisabled}>
        <ButtonArrow style={{transform: 'rotate(180deg)'}}/>
      </button>
      <button className={`button slider-btn slider-btn--next ${classNames[2]}`} onClick={onClickNext} disabled={isNextDisabled}>
        <ButtonArrow/>
      </button>
    </div>
  )
}
