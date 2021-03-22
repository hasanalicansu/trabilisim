import {GET_AS_DATA, GET_BS_DATA, GET_DATA} from './types';
import _ from 'lodash';
const socket = new WebSocket('wss://ws.kraken.com');

let counter = 0;
let asLocal = [];
let bsLocal = [];

export const onData = (data) => {
  return async dispatch => {
    if (counter == 0) {
      //Initial Snapshot
      data = JSON.parse(data);

      if (data[1].as) {
        counter = 1;
        asLocal = data[1].as;
        dispatch({type: GET_AS_DATA, payload: asLocal});
      }
      if (data[1].bs) {
        bsLocal = data[1].bs;
        dispatch({type: GET_BS_DATA, payload: bsLocal});
      }
    } else if (counter > 0) {
      //güncelleme,ekleme,silme olayları gerçekleşir
      data = JSON.parse(data);
      if (data.event == 'heartbeat') {
        console.log(
          '---------------------------------------------------------------------------',
        );
      } else if (data[1].a) {
        //As ve A için gerçekleşen olaylar
        let counterAs = 0;
        const tmp = data[1].a[0];
        for (let i = 0; i < asLocal.length; i++) {
          const x = asLocal[i];
          if (x[0] == tmp[0] && data[1].a.length == 1) {
            //Update/insert message-----AS'için Aynı fiyattan ürün var ve volume 0 değil ise volume'ü günceller
            asLocal.splice(counterAs, 1, tmp); //sil ve yerine koy
            dispatch({type: GET_AS_DATA, payload: asLocal});
            break;
          } else if (x[0] == tmp[0] && data[1].a.length == 2) {
            // Delete/insert message-----AS'için Aynı fiyattan ürün var ve volume 0 ise eski ürünü siler yeni geleni sıralamaya göre yerleştiri
            asLocal.splice(counterAs, 1); //sadece volume'ü sıfır olanı sil
            asLocal = await smallToLargeVolZero(asLocal, data[1].a[1]);
            dispatch({type: GET_AS_DATA, payload: asLocal});
            break;
          } else if (tmp[1] != '0.00000000') {
            //insert message-----AS'için Aynı fiyattan ürün yoksa küçükten büyüğe sıralama için büyüğü siler, yeni geleni sıralamaya göre yerleştiri
            asLocal = await smallToLargeNotMatched(asLocal, tmp);
            dispatch({type: GET_AS_DATA, payload: asLocal});
            break;
          }
          counterAs += 1;
        }
      } else if (data[1].b) {
        //Bs ve B için gerçekleşen olaylar
        let counterAs = 0;
        const tmp = data[1].b[0];

        for (let i = 0; i < bsLocal.length; i++) {
          const x = bsLocal[i];
          if (x[0] == tmp[0] && data[1].b.length == 1) {
            //Update/insert message-----BS'için Aynı fiyattan ürün var ve volume 0 değil ise volume'ü günceller

            bsLocal.splice(counterAs, 1, tmp); //sil ve yerine koy
            dispatch({type: GET_BS_DATA, payload: bsLocal});
            break;
          } else if (x[0] == tmp[0] && data[1].b.length == 2) {
            // Delete/insert message-----BS'için Aynı fiyattan ürün var ve volume 0 ise eski ürünü siler yeni geleni sıralamaya göre yerleştiri

            bsLocal.splice(counterAs, 1); //sadece volume'ü sıfır olanı sil
            bsLocal = await largeToSmallVolZero(bsLocal, data[1].b[1]);
            dispatch({type: GET_BS_DATA, payload: bsLocal});
            break;
          } else if (tmp[1] != '0.00000000') {
            //insert message-----BS'için Aynı fiyattan ürün yoksa büyükten küçüğe sıralama için küçüğü siler, yeni geleni sıralamaya göre yerleştiri

            bsLocal = await largeToSmallNotMatched(bsLocal, tmp);
            dispatch({type: GET_BS_DATA, payload: bsLocal});
            break;
          }
          counterAs += 1;
        }
      } else null;
    }
  };
};


//-----------------------------------------------------------------------------------------------------

smallToLargeVolZero = (comeData, willAdding) => {
  willAdding.splice(3, 1); //sadece volume'ü sıfır olanı sil
  for (let i = 0; i < comeData.length; i++) {
    const tmp = comeData[i];
    if (Number(willAdding[0]) < Number(tmp[0])) {
      comeData.splice(i, 0, willAdding);
      break;
    } else if (i + 1 == comeData.length) {
      comeData.splice(i + 1, 0, willAdding);
      break;
    }
  }

  return comeData;
};

smallToLargeNotMatched = (comeData, willAdding) => {
  for (let i = 0; i < comeData.length; i++) {
    const tmp = comeData[i];
    if (Number(willAdding[0]) < Number(tmp[0])) {
      comeData.splice(comeData.length - 1, 1);
      comeData.splice(i, 0, willAdding);
      break;
    }
  }

  return comeData;
};

//-----------------------------------------------------------------------------------------------------

largeToSmallVolZero = (comeData, willAdding) => {
  willAdding.splice(3, 1); //sadece volume'ü sıfır olanı sil
  for (let i = 0; i < comeData.length; i++) {
    const tmp = comeData[i];
    if (Number(willAdding[0]) > Number(tmp[0])) {
      comeData.splice(i, 0, willAdding);
      break;
    } else if (i + 1 == comeData.length) {
      comeData.splice(i + 1, 0, willAdding);
      break;
    }
  }

  return comeData;
};

largeToSmallNotMatched = (comeData, willAdding) => {
  for (let i = 0; i < comeData.length; i++) {
    const tmp = comeData[i];
    if (Number(willAdding[0]) > Number(tmp[0])) {
      comeData.splice(comeData.length - 1, 1);
      comeData.splice(i, 0, willAdding);
      break;
    }
  }

  return comeData;
};
