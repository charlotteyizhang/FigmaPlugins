import {
  handleI18nMessage,
  I18N_MESSAGE_TYPES,
  type I18nMessage,
} from "./i18n";
import { handleReactMessage, type ReactMessage } from "./reactCode";
import {
  handleSvgMessage,
  SVG_MESSAGE_TYPES,
  type SvgMessage,
} from "./svgCode";

figma.showUI(__html__, { width: 500, height: 680 });

type Message = I18nMessage | ReactMessage | SvgMessage;

figma.ui.onmessage = async (msg: Message) => {
  if (I18N_MESSAGE_TYPES.has(msg.type)) {
    await handleI18nMessage(msg as I18nMessage);
  } else if (SVG_MESSAGE_TYPES.has(msg.type)) {
    await handleSvgMessage(msg as SvgMessage);
  } else {
    await handleReactMessage(msg as ReactMessage);
  }
};
