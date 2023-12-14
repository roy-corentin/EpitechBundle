bits 64

section .text
global strlen

strlen:
    mov rbx, rdi        ; stock the first argument gave in parameter (rdi)
    xor rax, rax        ; Initialise rax to 0 because it's the return value and we will return the i
    jmp check           ; skip increment (usefull later for loop)

increment:
    inc rax             

check:
    cmp byte[rbx + rax], 0  ; compare if the string + i == 0 so '\0'
    jne increment           ; call the function 'increment' upper to create a loop if not the end
    ret
