import ReactOnRails from 'react-on-rails';

import Welcome from "../react/components/Welcome";
import MainHeader from "../react/components/MainHeader";
import ShowWarehouses from "../react/components/ShowWarehouses";
import WarehousePage from "../react/components/WarehousePage"
import ShowStores from "../react/components/ShowStores";
import StorePage from "../react/components/StorePage";
ReactOnRails.register({
    MainHeader,
    Welcome,
    ShowWarehouses,
    WarehousePage,
    ShowStores,
    StorePage,
});