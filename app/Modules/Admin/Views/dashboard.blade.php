@include('header')
<div>
    @if(session()->get('success'))
    <div class="alert alert-danger" role="alert">
    {{ session()->get('success') }}
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    @endif
<main>
   
    @include('menu')

    <div class="right-main">
        
        @include('topBar')

    <h1>Dashboard</h1>
    </div>
</main>
@include('footer')