import path from 'path';
import { Configuration } from 'webpack';

const webpackConfig: Configuration = {
  entry: './src/index.js', // 웹팩의 진입점(entry) 파일 경로
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들링된 파일의 출력 경로
    filename: 'bundle.js' // 번들링된 파일의 이름
  },
  mode: 'development' // 빌드 모드: 'development' 또는 'production'
  // 기타 설정들...
};

export default webpackConfig;
