import { brasilApiBaseUrl, discordApiBaseUrl } from "../common/baseUrls";
import { HttpClient } from "../lib/http-client";
import { BanksService } from "./methods/brasil-api/banks.service";
import { CnpjService } from "./methods/brasil-api/cnpj.service";
import { DddService } from "./methods/brasil-api/ddd.service";
import { RegistroBrService } from "./methods/brasil-api/registrobr.service";
import { DiscordUserService } from "./methods/discord-api/get-user";

class Main {
  public static async runBrasilApi() {
    const httpClient = new HttpClient(brasilApiBaseUrl);

    // services
    const bankService = new BanksService(httpClient);
    const cnpjService = new CnpjService(httpClient);
    const dddService = new DddService(httpClient);
    const registroBrService = new RegistroBrService(httpClient);

    // methods
    registroBrService.getDomainInfo()
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
