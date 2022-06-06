import { createStore } from 'vuex'

import account from "@/store/modules/account";
import gso from "@/store/modules/gso";

export default createStore({
    modules: {
        account: account,
        gso: gso
    }
})
