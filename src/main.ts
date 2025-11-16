import { startChat } from "./methods/gemini/chat";
import { listModels } from "./methods/gemini/list-models";

class Main {
  static async main() {
    startChat()
  }
}

Main.main();
