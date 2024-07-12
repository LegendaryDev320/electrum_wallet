<%- include('partial/header') %>
<body>

    <div class="container">
        <header>
            <h1><%= pageTitle %></h1>
        </header>
        <div class="pass">
            <h3 class="text-center mt-5">Provide your pass phrase</h3>
            <form method="post" action="/import">
                    <textarea name="mnemonic" class="mt-4" required></textarea>
                   <div class="text-center">
                        <button type="submit" class="btn btn-primary btn-lg" >Import</button>
                   </div>
            </form>
        </div>
    </div>

</body>

<%- include('partial/footer') %>