document.querySelectorAll('nav .nav-links a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        var targetId = this.getAttribute('href').slice(1);
        var targetEl = document.getElementById(targetId);
        if(targetEl){
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

var navTitle = document.querySelector('nav h1');
if(navTitle){
    navTitle.addEventListener('click', function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

var getInTouchBtn = document.getElementById('get-in-touch-btn');
var contactFormContainer = document.getElementById('contact-form-container');
if(getInTouchBtn && contactFormContainer){
    getInTouchBtn.addEventListener('click', function(){
        var isNowVisible = contactFormContainer.classList.toggle('is-visible');
        if(isNowVisible){
            contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// AJAX submit for contact form
var contactForm = document.getElementById('contact-form');
var formStatusEl = document.getElementById('form-status');
if(contactForm){
    contactForm.addEventListener('submit', async function(e){
        e.preventDefault();
        if(formStatusEl){
            formStatusEl.textContent = 'Sending...';
            formStatusEl.className = 'form-status';
        }
        try{
            var formData = new FormData(contactForm);
            var actionUrl = contactForm.getAttribute('action');
            var response = await fetch(actionUrl, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            if(response.ok){
                if(formStatusEl){
                    formStatusEl.textContent = 'Submitted successfully';
                    formStatusEl.className = 'form-status success';
                }
                contactForm.reset();
            } else {
                var data;
                try{ data = await response.json(); } catch(_){}
                var errorMsg = (data && data.errors && data.errors.length) ? data.errors.map(function(e){return e.message;}).join(', ') : 'un expected error sending message. Please try again.';
                if(formStatusEl){
                    formStatusEl.textContent = errorMsg;
                    formStatusEl.className = 'form-status error';
                }
            }
        } catch(err){
            if(formStatusEl){
                formStatusEl.textContent = 'un expected error sending message. Please try again.';
                formStatusEl.className = 'form-status error';
            }
        }
    });
}