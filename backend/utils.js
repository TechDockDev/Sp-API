const SellingPartnerAPI = require("amazon-sp-api");
let sellingPartner = new SellingPartnerAPI({
  region: "na", // The region to use for the SP-API endpoints ("eu", "na" or "fe")
  refresh_token:
    "Atzr|IwEBICUHZlEaJwsOQ5um2ib28KIPIcDQOnzhOQ8Bek_2sn5ddZJkgmHl8fkjzIbIfilscXbQ7NXBzJI1Mr0GShJXxcnTCzryn3Z5Y-Z18E7tioOSC_8zk306l1jDsICatXCoDI89TyYjJ3z_ZYWMnW01XEUNt9UIZ_unbVAc5E0eq3_pd4-Af2Ddrd1iGFm3huOcRxEt3bk_FeyIt95Bw208MMbPXZZYNGxYAVQHsyCVKRAwmLv9Hzor-1MTIfznKfkOlEfQ3NZ46S7gTQvCOzG5s4kAS5eE0GocjZjcvwDJU8i6l35Z_NB0c7f20x5XIErxty0", // The refresh token of your app user
  // options: { use_sandbox: true },
});

module.exports = sellingPartner;
