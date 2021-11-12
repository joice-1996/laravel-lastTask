
@include('header')

<section class="login-wrapper">
    <div class="login-middle">
        <div class="text-center">
        <img src="{{asset('images/login-logo.svg')}}" width="260" />
</div>
<div class="container">
    @if(session()->get('fail'))
    <div class="alert alert-danger" role="alert">
    {{ session()->get('fail') }}
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    @endif

<form  method="post" action="admin/logsearch">
@csrf
        <div class="form-wrapper">
        
            <h4 class="text-uppercase">Login</h4>
            <div class="">
                <input type="email" name="email" class="form-control"  placeholder="Username" required>
                <span style="color:red">@error('email'){{$message}}@enderror</span>
                
            </div>
            <div class="">
                <input type="password" name="password" class="form-control" placeholder="Password" required>
                <span style="color:red">@error('password'){{$message}}@enderror</span>
            </div>
            
            <div class="text-center">
                <button type="submit" class="primary-btn">Login</button>
            </div>
            
            <p class="text-center forgot-pass">
                <u><a href="">Forgot Password?</a></u>
            </p>

        </div>
        </form>
    </div>

</section>

@include('footer')