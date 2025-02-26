package de.szut.lf8_starter.config;



import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import jakarta.servlet.ServletContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;


@Configuration
public class OpenAPIConfiguration {

    private ServletContext context;

    public OpenAPIConfiguration(ServletContext context) {
        this.context = context;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public OpenAPI springShopOpenAPI(
            //  @Value("${info.app.version}") String appVersion,
    ) {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .addServersItem(new Server().url(this.context.getContextPath()))
                .info(new Info()
                        .title("LF12 project starter")
                        .description("\n## Auth\n" +
                                "\n## Authentication\n" + "\nThis Hello service uses JWTs to authenticate requests. You will receive a bearer token by making a POST-Request in IntelliJ on:\n\n" +
                                "\n" +
                                "```\nPOST http://localhost:9090/realms/LF12/protocol/openid-connect/token\n" +
                                "Content-Type: application/x-www-form-urlencoded\n" +
                                "\n" +
                                "grant_type=password&client_id=lf12&username=lf12_test_user&password=secret\n```\n" +
                                "\n" +
                                "\nTo get a bearer-token in Postman, you have to follow the instructions in \n [Postman-Documentation](https://documenter.getpostman.com/view/7294517/SzmfZHnd).")

                        .version("0.1"))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }


}