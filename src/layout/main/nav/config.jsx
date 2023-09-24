// component
import SvgColor from "../../../components/svgcolor/SvgColor";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/sidebar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("dashboard"),
  },
  {
    title: "Product",
    path: "/dashboard/product",
    icon: icon("product"),
  },
  {
    title: "Banner",
    path: "/dashboard/banner",
    icon: icon("banner"),
  },
  {
    title: "News",
    path: "/dashboard/news",
    icon: icon("news"),
  },
  {
    title: "Customer",
    path: "/dashboard/customer",
    icon: icon("partner"),
  },
  {
    title: "Job",
    path: "/dashboard/job",
    icon: icon("job"),
  },
  {
    title: "Forum",
    path: "/dashboard/forum",
    icon: icon("forum"),
  },
];

export default navConfig;
