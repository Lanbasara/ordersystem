import Mutil from '../util/mm.jsx';

const _mm = new Mutil();

class Static{
  getHomeCount(){
    return _mm.request({
      url : '/manage/statistic/base_count.do'

    });
  }
}
export default Static;