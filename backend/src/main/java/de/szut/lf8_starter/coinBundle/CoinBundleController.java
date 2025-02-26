package de.szut.lf8_starter.coinBundle;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/coinbundle")
public class CoinBundleController {
    public CoinBundleController() {

    }

    @GetMapping("/{bundleId}")
    public ResponseEntity<String> getCoinBundle(@PathVariable String bundleId) {
        return null;
    }

    @GetMapping
    public ResponseEntity<String> getCoinBundles() {
        return null;
    }

}
