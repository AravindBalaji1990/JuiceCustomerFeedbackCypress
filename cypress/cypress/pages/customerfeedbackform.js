import * as math from 'mathjs'

class customerfeedbackform{

    checkAuthor(){
        cy.get('#mat-input-1').should('be.disabled')
    }

    enterComments(commentfield){
    cy.get('#comment').clear() 
    cy.get('#comment').type(commentfield)
    return this
    }

    ratingSliderRightArrow(){
        cy.get('#rating').type("{rightarrow}")
        return this
    }

    ratingSliderleftArrow(){
        cy.get('#rating').type("{leftarrow}")
        return this
    }

    captchaValidation(){
        cy.get('#captcha').invoke('text').then((text)=>{
            var pattern = /[0-9]+/g;
            var number = text.match(pattern);
            var pattern1 = /[+/,-/,/*,//]+/g;
            var aoperation = text.match(pattern1)
            const result = math.evaluate(text);
            cy.log('data ', result)
            cy.get('#captchaControl').type(result,{wait: 10000})
          })
          return this
    }

    submitForm(){
        cy.get('#submitButton').click({force: true})
        cy.get('.mat-simple-snack-bar-content').should('be.visible')
        return this 
    }

    submitFormDisabled(){
        cy.get('#submitButton').click({force: true})
        cy.get('#submitButton').invoke('attr', 'class').should('contain','disabled')
        return this 
    }

    noCommentError(){
        cy.get('#mat-error-0').should('be.visible')
        cy.get('#mat-error-0').invoke('text').should('eq','Please provide a comment. ')
        return this
    }

    clearCommentField(){
        cy.get('#comment').clear() 
        return this
    }

    invalidCaptcha(captchatext){
        cy.get('#captchaControl').type(captchatext)
        return this
    }

    wrongCaptchaValidation(){
        cy.get('.mat-simple-snack-bar-content').invoke('text').should('eq','Wrong answer to CAPTCHA. Please try again.')
        return this
    }

    noCaptchaError(){
        cy.get('#mat-error-1').should('be.visible')
        return this
    }

    clickCaptchaControl(){
        cy.get('#captchaControl').click()
        return this
    }
}
export default customerfeedbackform