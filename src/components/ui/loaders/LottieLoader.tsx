import classNames from 'classnames';
import { useLottie } from 'lottie-react';

interface IProp {
  option: {
    loop?: boolean;
    loader: any;
    height?: number;
    width?: number;
  };
  className?: string;
}

const LottieLoader = ({ option, className }: IProp): React.ReactElement => {
  const style = {
    width: option.height ?? 200,
    height: option.width ?? 200,
  };

  const options = {
    animationData: option.loader,
    loop: option.loop ?? true,
  };

  const { View } = useLottie(options, style);

  return <div className={classNames(className)}>{View}</div>;
};

export default LottieLoader;
