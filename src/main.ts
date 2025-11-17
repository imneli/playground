import { brasilApiBaseUrl, discordApiBaseUrl } from "../common/baseUrls";
import { HttpClient } from "../lib/http-client";
import { ExchangeService } from "./services/brasil-api/exchange.service";
import { RegistroBrService } from "./services/brasil-api/registrobr.service";
import { DiscordUserService } from "./services/discord-api/get-user";

class Main {
  public static async runBrasilApi() {
    const httpClient = new HttpClient(brasilApiBaseUrl);

    // services
    const registroBrService = new RegistroBrService(httpClient);
    const exchangeService = new ExchangeService(httpClient);

    // methods
    exchangeService.getPriceBasedOnDate();
  }

  public static async runDiscordApi() {
    const httpClient = new HttpClient(discordApiBaseUrl);

    // services
    const discordUserService = new DiscordUserService(httpClient);

    //methods
    discordUserService.getUser();
  }
}

Main.runBrasilApi();
