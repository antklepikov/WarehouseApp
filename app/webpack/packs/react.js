import ReactOnRails from 'react-on-rails';

import Welcome from "../react/components/Welcome";
import MainHeader from "../react/components/MainHeader";
import ShowWarehouses from "../react/components/ShowWarehouses";
import WarehousePage from "../react/components/WarehousePage"
import WarehousesProducts from "../react/components/WarehousesProducts"
ReactOnRails.register({
    MainHeader,
    Welcome,
    ShowWarehouses,
    WarehousePage,
    WarehousesProducts
});