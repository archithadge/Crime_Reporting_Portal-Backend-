#include<bits/stdc++.h>
using namespace std;

int z(){
    return 10;
}
class boss{
    public:
    virtual int f(){
        cout<<"master";
        return 0;
    }
};
class A:public boss{
    public:
    int fck=z();

    int f(){
        cout<<"slave";
        return 0;
    }
   
};

int main(){
    boss* a=new A();
    a->f();
}