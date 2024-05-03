import { Oval } from "react-loader-spinner";

type SpinnerProps = {
  size: string;
}

export function Spinner({size}: SpinnerProps): JSX.Element {
  return (
    <Oval
      visible={true}
      height={size}
      width={size}
      color={"#141416"}
      secondaryColor="rgba(45,52,64, 40%)"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}
