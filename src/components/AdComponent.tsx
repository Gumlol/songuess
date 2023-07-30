import React, { Component } from 'react';

class AdComponent extends Component {
  componentDidMount() {
    const script1 = document.createElement('script');
    script1.src = 'https://yandex.ru/ads/system/context.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = 'window.yaContextCb.push(() => { Ya.Context.AdvManager.render({"blockId":"R-A-2335957-1","renderTo":"yandex_rtb_R-A-2335957-1"}) });';
    document.body.appendChild(script2);
  }

  render() {
    return (
      <div id="yandex_rtb_R-A-2335957-1"></div>
    );
  }
}

export default AdComponent;
