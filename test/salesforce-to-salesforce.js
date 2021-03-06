const assert = require("assert");
const child = require("child_process");
const path = require("path");

(process.env.TEST_INTEGRATION === "true" ? describe : describe.skip)(
  "SalesforceToSalesforce",
  () => {
    it("should enable salesforce to salesforce", function() {
      this.timeout(1000 * 120);
      this.slow(1000 * 30);
      var enableCmd = child.spawnSync("sfdx", [
        "browserforce:shape:apply",
        "-f",
        path.resolve(
          path.join("test", "fixtures", "enable-salesforce-to-salesforce.json")
        )
      ]);
      assert.deepEqual(enableCmd.status, 0, enableCmd.stderr);
      assert(/to 'true'/.test(enableCmd.stdout.toString()));
      var disableCmd = child.spawnSync("sfdx", [
        "browserforce:shape:apply",
        "-f",
        path.resolve(
          path.join("test", "fixtures", "disable-salesforce-to-salesforce.json")
        )
      ]);
      assert.deepEqual(disableCmd.status, 0, disableCmd.stderr);
      assert(/to 'false'/.test(disableCmd.stdout.toString()));
      assert(/cannot be disabled/.test(disableCmd.stderr.toString()));
    });
  }
);
