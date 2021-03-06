import CMS from "netlify-cms-app"
import { URLWidgetControl, URLWidgetPreview } from "./urlWidget"
import { LinkWidgetControl } from "./linkWidget"
import { CroppedImagePreview } from "./croppedImage"
import Image from "netlify-cms-widget-image"

CMS.registerWidget("url", URLWidgetControl, /* URLWidgetPreview */);
CMS.registerWidget("link", LinkWidgetControl);

// Fields:
//		image_height: "height of image. Passed to css"
//		image_width: "width of image. Passed to css"
CMS.registerWidget("croppedImage", Image.controlComponent, CroppedImagePreview);
