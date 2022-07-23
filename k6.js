import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  scenarios: {
    one: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
      maxDuration: '15m',
    },
    // peak: {
    //   executor: 'ramping-vus',
    //   startVUs: 1,
    //   stages: [
    //     { duration: '10s', target: 50 }, // ramp up
    //     { duration: '1m', target: 50 }, // stay
    //     { duration: '10s', target: 0 }, // scale down. (optional)
    //   ],
    //   gracefulRampDown: '10s',
    // },
  },

  // For Unity client, 1 user has max 10 concurrent request (defined in addressable asset)
  batch: 10, // The maximum number of simultaneous/parallel connections in total that an http.batch() call in a VU can make.
  batchPerHost: 10, // The maximum number of simultaneous/parallel connections for the same hostname that an http.batch() call in a VU can make.

  discardResponseBodies: true, //  Lessens the amount of memory required and the amount of GC - reducing the load on the testing machine, and probably producing more reliable test results.

  noConnectionReuse: true, // Whether a connection is reused throughout different actions of the same virtual user and in the same iteration.
  noVUConnectionReuse: true, // Whether k6 should reuse TCP connections between iterations of a VU.

  dns: {
    ttl: '0',
    select: 'random',
    policy: 'preferIPv4',
  },
};

const minio1Counter = new Counter('minio1');
const minio2Counter = new Counter('minio2');

const hostUrl = 'https://oss-dev.game-soul-swe.com:9000';

export default function () {
  const res = http.batch([
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/90f2ba10679a085488a4a07d6ff93703_unitybuiltinshaders_edbaca43dafb95326c156bacda4f4455.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/achievement-ui_assets_all_a9efd6e566eb23ef7386d6fcfb60dc55.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/animation_assets_all_50db3efbd637f9c3113fddaaa9721b62.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/audio_assets_all_fd6e14c2db87fd72ac3a33ee9ef50d04.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/avatar_assets_all_c6b372a35dcb467fcdfb63c79dab6ccb.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/avatarframe_assets_all_fbcc233ca6fe60df2e0a90441a170509.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/bankerdice_assets_all_26e2db9403d90f3a9ec11cb6f95239aa.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/bracelet_assets_all_9015e2126990b7cb5adb41093839b810.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/cardsets_assets_all_830b8a8dca98d3ecbeac1913f674ac6a.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/catalog_2022.07.21.09.58.33.hash`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/catalog_2022.07.21.09.58.33.json`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/club-ui_assets_all_84c7cc2ba89e87196ef826ad6ca58d6b.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/cmj-3d_assets_all_397f6d057412e8c5b333a62323c3c421.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/cmj-ui_assets_all_379d09933e563186cb5989a00173fd10.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/cnpoker_assets_all_516fe661b8ba79d7cb8e887b3b565122.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/common_assets_all_263e63b54ba67ed01ea9f98690caae73.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/data_assets_all_c27558b52c59309bdf21cb830f689bb4.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/desktop_assets_all_be76eea71c13d92968d969986c9146e6.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/effect_assets_all_ed7e655b54be232beb1dc312cd10f0ba.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/font_assets_all_e003dc0c3c8a213c11902d7c321ab146.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/glove_assets_all_7892c85774cadeba1c675689d34664b5.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/hand_assets_all_e0857068a4e41bf3aac955a2fdf0b8fe.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/inventory_assets_all_ea8dcfc125dd7832e2d1b8d27c4d8cf9.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/levelmedal_assets_all_8b9db51d33461c3e5d36e3f86b020c9b.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/lobby-3d_assets_all_dd2fb670a9a79ab7abcc3498777b30cf.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/lobby-ui_assets_all_efccd614e150d69d458cbbd30758c9b5.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/mail-ui_assets_all_f40d3f6f7f855b4508b990bb86731355.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/mjeffect_assets_all_b0f14946d4eef61393987c316fd3d041.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/nail_assets_all_7353f17d27225ebfec6f56a319d50deb.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/nameplateframe_assets_all_73d0414cd85fec2eeff0c6b703b24cac.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/ring_assets_all_51166230f3248f094e38639fb46862e2.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/ruler_assets_all_bc40ced4566f097b926be5518ab9236a.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_achievementscene_fd16fda8d4f0e9f26582deabbcd3b5ef.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_chinesepokerloadingscene_605d5c4716115fb228868ab38eb2c8cd.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_chinesepokerscene_6fdf35b788b51c724b646dc7f6a3a0dd.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_clubscene_97d56ef5cb1cdf59777b46b779947b96.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_cmjgamescene_40688a146021985bb2e002640c855a2a.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_cmjloadingscene_ee6a628d0d6ee80d48f76d19747074aa.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_friendsscene_b32ccc51ca68b5053d84053be47ca0b2.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_inventoryscene_8adca74865d93dc755546869e3189c3b.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_lobbyloadingscene_2659ca9887b3901fc5a235c863ec1a07.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_lobbyscene_0a999d2c85684f9967f3fd9e94d75039.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_mailscene_7aa38d3e028272e007b6f50372aabc99.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_matchmakingscene_e36d6c56e1117595aca120bf3958abb8.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_missionscene_58b196f0e46987122df772612fc0f442.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_mjreplayloadingscene_34e675d4ed6bf791e67ce3c67faeab68.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_mjreplayscene_1578d475eee125ab7a8866ea27a6c5bc.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_prizescene_c7ada265f1936579d7a9cd9a58e276af.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_rematchmakingscene_9eebc4db962dbb92bbdcfa2e5ba58d3d.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_setnamescene_b1d22d0e3dd7f1f4774aa786fac0d5ac.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_shopscene_63a974ef23df0ab574066f2e3a859bcd.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_twoplayersmjscene_afcf4cc1c1588385981f9a114f7d740c.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_userinfoscene_347c36307619f3eeecf85845bf0335d5.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_yablonloadingscene_1faae1bbde458e5e0131638f904eb746.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/scenelist_scenes_yablonscene_2b6e1940f6b037b89859c977d533aa81.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/shop-ui_assets_all_ef72ec3103c3ec180428dbcc766ec30e.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/sleeve_assets_all_d33137f92566456e0222c952289fd57d.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/tatoo_assets_all_4d553d97079ad6272eb1ffe25438cad9.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/tileback_assets_all_e1910baf2aa3ff2b27b6cf9b3b69b95e.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/tilefront_assets_all_41f288844de77bd07eca3e40237d9da9.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/title_assets_all_4bd5f02ceb6514be6835646b88f2bc62.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/tmpeffect_assets_all_63df940db9adb3fd90e4483b1916f512.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/userinfo-ui_assets_all_ac18bd2a44333cf0eaa4aac140f6c8b1.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/watch_assets_all_6b15316bac5cf2ed9e1b32cc1b2444dc.bundle`],
    ['GET', `${hostUrl}/lom-dev-1/asset/feature-cicd-minio/1.2.1/Android/yablon-ui_assets_all_81df69afba350dd3dc722a1e5978eb38.bundle`],
  ]);
  res.forEach(element => {
    if (element.remote_ip === '103.137.246.213') minio1Counter.add(1);
    else if (element.remote_ip === '103.137.246.214') minio2Counter.add(1);
  });
  sleep(0.1);
}
