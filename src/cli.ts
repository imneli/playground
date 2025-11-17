import {
  brasilApiBaseUrl,
  discordApiBaseUrl,
  geminiApiBaseUrl,
} from "../common/baseUrls";
import { rl } from "../common/rl";
import { HttpClient } from "../lib/http-client";
import { question } from "./question";

// public api
import { CepService } from "./services/brasil-api/cep.service";
import { CnpjService } from "./services/brasil-api/cnpj.service";
import { BanksService } from "./services/brasil-api/banks.service";
import { DddService } from "./services/brasil-api/ddd.service";
import { ExchangeService } from "./services/brasil-api/exchange.service";
import { RegistroBrService } from "./services/brasil-api/registrobr.service";
import { VehicleService } from "./services/brasil-api/vehicle.service";

// auth apis
import { DiscordUserService } from "./services/discord-api/user.service";
import { GeminiService } from "./services/gemini/gemini.service";

class CLI {
  async run() {
    console.log("\n=== API Playground CLI ===\n");
    console.log("1. APIs Públicas (sem autenticação)");
    console.log("2. APIs Privadas (requer token/api key)");
    console.log("0. Sair\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await this.showPublicApis();
        break;
      case "2":
        await this.showPrivateApis();
        break;
      case "0":
        console.log("\nAté mais!");
        rl.close();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }

  private async showPublicApis() {
    console.log("\n=== APIs Públicas ===\n");
    console.log("1. Brasil API");
    console.log("0. Voltar\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await this.showBrasilApiMenu();
        break;
      case "0":
        await this.run();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }

  private async showPrivateApis() {
    console.log("\n=== APIs Privadas ===\n");
    console.log("1. Discord API (requer BOT TOKEN)");
    console.log("2. Gemini API (requer API KEY)");
    console.log("0. Voltar\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await this.showDiscordApiMenu();
        break;
      case "2":
        await this.showGeminiApiMenu();
        break;
      case "0":
        await this.run();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }

  private async showBrasilApiMenu() {
    const httpClient = new HttpClient(brasilApiBaseUrl);

    console.log("\n=== Brasil API ===\n");
    console.log("1. CEP - Buscar endereço");
    console.log("2. CNPJ - Buscar empresa");
    console.log("3. Bancos - Listar todos");
    console.log("4. Bancos - Buscar por código");
    console.log("5. DDD - Buscar cidades");
    console.log("6. Câmbio - Listar moedas");
    console.log("7. Câmbio - Cotação por data");
    console.log("8. Registro.br - Info domínio");
    console.log("9. Veículos - Preço FIPE");
    console.log("0. Voltar\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await new CepService(httpClient, "v1").getCep();
        break;
      case "2":
        await new CnpjService(httpClient).getCpnj();
        break;
      case "3":
        await new BanksService(httpClient).getBanks();
        break;
      case "4":
        await new BanksService(httpClient).getBankByCode();
        break;
      case "5":
        await new DddService(httpClient).getDdd();
        break;
      case "6":
        await new ExchangeService(httpClient).getAllCoins();
        break;
      case "7":
        await new ExchangeService(httpClient).getPriceBasedOnDate();
        break;
      case "8":
        await new RegistroBrService(httpClient).getDomainInfo();
        break;
      case "9":
        await new VehicleService(httpClient).getVehiclePrice();
        break;
      case "0":
        await this.showPublicApis();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }

  private async showDiscordApiMenu() {
    const httpClient = new HttpClient(discordApiBaseUrl);

    console.log("\n=== Discord API ===");
    console.log("(Certifique-se de ter TOKEN no .env)\n");
    console.log("1. Buscar usuário por ID");
    console.log("0. Voltar\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await new DiscordUserService(httpClient).getUser();
        break;
      case "0":
        await this.showPrivateApis();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }

  private async showGeminiApiMenu() {
    const httpClient = new HttpClient(geminiApiBaseUrl);

    console.log("\n=== Gemini API ===");
    console.log("(Certifique-se de ter GEMINI_API_KEY no .env)\n");
    console.log("1. Chat com Gemini");
    console.log("2. Listar modelos disponíveis");
    console.log("0. Voltar\n");

    const option = await question("Escolha: ");

    switch (option) {
      case "1":
        await new GeminiService(httpClient).startChat();
        break;
      case "2":
        await new GeminiService(httpClient).listModels();
        break;
      case "0":
        await this.showPrivateApis();
        break;
      default:
        console.log("\nOpção inválida!");
        rl.close();
    }
  }
}

const cli = new CLI();
cli.run();
