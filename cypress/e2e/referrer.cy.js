describe("template spec", () => {
  it("should visit with referrer", () => {
    const onBeforeLoad = (contentWindow) => {
      Object.defineProperty(contentWindow.document, "referrer", {
        value: "https://www.bing.com/",
        enumerable: true,
        configurable: true,
      });
    };

    cy.viewport(390, 844);
    cy.visit(
      "https://100-west-new-ppc.webflow.io/?utm_campaign=St.+Louis,+MO+(South+County+Mall)%7CNB%7CGeneral%7CStLuSCM_MO%7C3141&utm_adgroup=Non-Brand%7CDentist&utm_term=dentist",
      { onBeforeLoad }
    );
  });
});
