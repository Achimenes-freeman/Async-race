import { CarsList } from './src/components/CarsList/CarsList';

import './index.scss';

document.documentElement.append(new CarsList([1, 2, 3, 4, 5, 6, 7]).render());
