var app =angular.module("shopping-cart-app",[]);

app.controller("shopping-cart-ctrl", function ($scope,$http){
    // QL GIOR HANG
    $scope.cart= {
        items:[],
        user:"",
        //Them vao cart
        add(id){
            var item = this.items.find(item=>item.id ==id);
            if (item){
                item.qty++;
                this.saveToLocalStorage();
            }
            else {
                $http.get(`/rest/products/${id}`).then(resp=>{
                    resp.data.qty =1;
                    this.items.push(resp.data);
                    this.saveToLocalStorage();
                })
            }
            Swal.fire('Thêm vào giỏ hàng thành công');
        },
        //xoa sp khoi cart
        remove(id){

            Swal.fire({
                title: 'Bạn chắc chắn muốn xóa?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.isConfirmed) {
                    var index = this.items.findIndex(item=>item.id == id);
                    this.items.splice(index,1);
                    this.saveToLocalStorage();
                    location.reload();
                }
            })
        }
        ,
        //Tong sl mat hang trong gio
        get count(){
            return this.items
                .map(item=>item.qty)
                .reduce((total,qty)=>total +=qty,0)
        }
        ,
        //Tong tien cac mat hang trong gio
        get amount(){
            return this.items
                .map(item=>item.qty * item.price)
                .reduce((total,qty)=>total +=qty,0)
        }
        ,
        clear(){
            Swal.fire({
                title: 'Bạn chắc chắn muốn xóa giỏ hàng?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.isConfirmed){
                    this.items= [];
                    this.saveToLocalStorage();
                    location.reload();
                }
            })
        }
        ,
        //Luu cart vao local storage
        saveToLocalStorage(){
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart",json);
        },
        //Doc cart tu local storage
        loadFromLocalStorage(){
            var json = localStorage.getItem("cart");
            this.items = json? JSON.parse(json):[];
        },
    },
    $scope.cart.loadFromLocalStorage();
    var user = document.getElementById("username");
    var username="";
    if (user!=null){
        username= user.textContent;
    }
        $scope.order = {
            createDate : new Date(),
            address:"",
            account: {username:username},
            get orderDetails(){
                return $scope.cart.items.map(item=>{
                    return {
                        product:{id:item.id},
                        price:item.price,
                        quantity:item.qty
                    }
                });
            },
            purchase(){
                var order = angular.copy(this);
                //thuc hien dat hang
                Swal.fire({
                    title: 'Bạn chắc chắn muốn đặt hàng?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $http.post("/rest/orders",order).then(resp=>{
                            $scope.cart.clear();
                            location.href="/order/detail/"+resp.data.id;
                            Swal.fire('Đặt hàng thành công');
                        }).catch(error=>{
                            alert("Dat hang loi");
                            console.log(error)
                        })
                    }
                })



            }
        }


})