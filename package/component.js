import Page from './components/Page/index.vue'
import Header from './components/Header/index.vue'
import HeaderItem from './components/HeaderItem/index.vue'
import Status from './components/Status/index.vue'
import Span from './components/Span/index.vue'
import Strong from './components/Strong/index.vue'
import Flex from './components/Flex/index.vue'
import FlexItem from './components/FlexItem/index.vue'
import SafeArea from './components/SafeArea/index.vue'
import ThemeProvider from './components/ThemeProvider/index.vue'
import Collapse from './components/Collapse/index.vue'
import CollapseGroup from './components/CollapseGroup/index.vue'
import Card from './components/Card/index.vue'
import Badge from './components/Badge/index.vue'
import ButtonTab from './components/ButtonTab/index.vue'
import Input from './components/Input/index.vue'
import Change from './components/Change/index.vue'
import ChartLine from './components/ChartLine/index.vue'
import ChartBar from './components/ChartBar/index.vue'
import ChartPie from './components/ChartPie/index.vue'
import Popup from './components/Popup/index.vue'
import SelectDate from './components/SelectDate/index.vue'
import Count from './components/Count/index.vue'
import Spinner from './components/Spinner/index.vue'
import Tabs from './components/Tabs/index.vue'
import TabPanel from './components/Tabs/tabPanel.vue'
import Tabbar from './components/Tabbar/index.vue'
import TabbarPanel from './components/Tabbar/tabbarPanel.vue'
import Btn from './components/Btn/index.vue'
import BtnGroup from './components/BtnGroup/index.vue'
import ParallaxView from './components/ParallaxView/index.vue'
import Panel from './components/Panel/index.vue'
import CellTextarea from './components/CellTextarea/index.vue'
import CellInput from './components/CellInput/index.vue'
import CellPicker from './components/CellPicker/index.vue'
import CellSelect from './components/CellSelect/index.vue'
import Ripple from './components/Ripple/index.vue'
import Loading from './components/Loading/index.vue'
import CheckBox from './components/CheckBox/index.vue'
import CheckList from './components/CheckList/index.vue'
import SelectData from './components/SelectData/index.vue'
import Form from './components/Form/index.vue'
import Sticky from './components/Sticky/index.vue'
import AutoLoading from './components/AutoLoading/index.vue'
import Seal from './components/Seal/index.vue'
import Img from './components/Img/index.vue'
import List from './components/List/index.vue'
import Pull from './components/Pull/index.vue'
import WeatherPanel from './components/FhpWeatherPanel/index.vue'
import FhpChartLine from './components/FhpChartLine/index.vue'
import FhpChartLineWs from './components/FhpChartLine/ws.vue'
import TimeLine from './components/TimeLine/index.vue'
import Slider from './components/Slider/index.vue'
const components = [
  Page,
  Header,
  HeaderItem,
  Status,
  Span,
  Strong,
  Sticky,
  Flex,
  FlexItem,
  SafeArea,
  ThemeProvider,
  Collapse,
  CollapseGroup,
  Card,
  Badge,
  ButtonTab,
  Input,
  Change,
  ChartLine,
  ChartBar,
  ChartPie,
  Popup,
  SelectDate,
  Count,
  Spinner,
  Tabs,
  TabPanel,
  Tabbar,
  TabbarPanel,
  Btn,
  BtnGroup,
  ParallaxView,
  Panel,
  Ripple,
  Loading,
  CellTextarea,
  CellInput,
  CellPicker,
  CellSelect,
  CheckBox,
  CheckList,
  SelectData,
  Form,
  AutoLoading,
  Seal,
  Img,
  List,
  Pull,
  WeatherPanel,
  FhpChartLine,
  FhpChartLineWs,
  TimeLine,
  Slider
]

export default {
  install(Vue) {
    components.forEach(item => Vue.component(item.name, item))
  }
}
