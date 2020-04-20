import ReactOnRails from 'react-on-rails';

import Welcome from "../react/components/Welcome";
import MainHeader from "../react/components/MainHeader";
import ShowWarehouses from "../react/components/ShowWarehouses";
import WarehousePage from "../react/components/WarehousePage"
import ShowStores from "../react/components/ShowStores";
import StorePage from "../react/components/StorePage";
import ShowOrder from "../react/components/ShowOrder";
ReactOnRails.register({
    MainHeader,
    Welcome,
    ShowWarehouses,
    WarehousePage,
    ShowStores,
    StorePage,
    ShowOrder,
});